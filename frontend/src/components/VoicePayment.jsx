import React, { useState, useEffect } from 'react';

const VoicePayment = ({ onPaymentSuccess, users = [] }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [parsedCommand, setParsedCommand] = useState(null);

  // Debug: Log users when component loads
  useEffect(() => {
    console.log('VoicePayment received users:', users);
    console.log('Users length:', users.length);
  }, [users]);

  // Check if browser supports speech recognition
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  useEffect(() => {
    if (!recognition) return;

    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setError('');
      setResult(null);
      setParsedCommand(null);
    };

    recognition.onresult = (event) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      if (finalTranscript) {
        setTranscript(finalTranscript);
        parseAndProcessCommand(finalTranscript);
      }
    };

    recognition.onerror = (event) => {
      setError(`Voice recognition error: ${event.error}`);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  }, [recognition, users]);

  // Parse voice command to extract recipient and amount
  const parseVoiceCommand = (command) => {
    const lowerCommand = command.toLowerCase().trim();
    console.log('Parsing command:', lowerCommand);
    
    // Extract amount
    const amountMatch = lowerCommand.match(/(?:send|pay|transfer)\s+(\d+(?:\.\d{1,2})?)/);
    if (!amountMatch) {
      throw new Error("Could not understand the amount. Try saying 'Send 100 to John' or 'Pay 50 to Sarah'");
    }
    
    const amount = parseFloat(amountMatch[1]);
    if (amount <= 0) {
      throw new Error("Amount must be greater than 0");
    }

    // Extract recipient name (after "to") - Updated to handle punctuation
    const toMatch = lowerCommand.match(/to\s+([a-zA-Z\s]+)[\.\,\!]?$/);
    if (!toMatch) {
      throw new Error("Please specify recipient. Say 'Send 100 to John' or 'Pay 50 to Sarah'");
    }
    
    const spokenName = toMatch[1].trim().replace(/[\.\,\!\?]$/, '');
    console.log('Looking for user:', spokenName);
    console.log('Available users:', users);
    
    // Find matching user
    const matchingUser = users.find(user => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      const firstName = user.firstName.toLowerCase();
      const lastName = user.lastName.toLowerCase();
      
      console.log('Checking user:', firstName, lastName, fullName);
      
      return firstName.includes(spokenName) || 
             lastName.includes(spokenName) || 
             fullName.includes(spokenName) ||
             spokenName.includes(firstName) ||
             spokenName.includes(lastName);
    });

    console.log('Matching user found:', matchingUser);

    if (!matchingUser) {
      // Show available users for better error message
      const availableNames = users.map(u => u.firstName).join(', ');
      throw new Error(`User not found. Available users: ${availableNames}`);
    }

    return {
      amount,
      recipient: matchingUser,
      spokenName
    };
  };

  const parseAndProcessCommand = async (voiceCommand) => {
    try {
      const parsed = parseVoiceCommand(voiceCommand);
      setParsedCommand(parsed);
      
      // Start 5-second countdown timer
      let countdown = 5;
      const countdownInterval = setInterval(() => {
        countdown--;
        setParsedCommand(prev => ({ ...prev, countdown }));
        
        if (countdown <= 0) {
          clearInterval(countdownInterval);
          processVoicePayment(voiceCommand, parsed.recipient._id);
        }
      }, 1000);
      
      // Store interval ID in parsed command so we can cancel it
      setParsedCommand(prev => ({ ...prev, countdownInterval, countdown: 5 }));
      
    } catch (err) {
      setError(err.message);
    }
  };

  const processVoicePayment = async (voiceCommand, recipientId) => {
    setIsProcessing(true);
    
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch('http://localhost:3000/api/v1/account/voice-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          voiceCommand: voiceCommand,
          recipientId: recipientId
        })
      });

      const data = await response.json();

      if (data.success) {
        setResult(data);
        setParsedCommand(null);
        if (onPaymentSuccess) {
          onPaymentSuccess(data);
        }
      } else {
        setError(data.message || 'Payment failed');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const startListening = () => {
    if (!recognition) {
      setError('Speech recognition not supported in this browser');
      return;
    }

    if (!users || users.length === 0) {
      setError('No users available for payment. Users data not loaded yet.');
      return;
    }

    setTranscript('');
    setError('');
    recognition.start();
  };

  const stopListening = () => {
    if (recognition && isListening) {
      recognition.stop();
    }
  };

  const cancelPayment = () => {
    if (parsedCommand?.countdownInterval) {
      clearInterval(parsedCommand.countdownInterval);
    }
    setParsedCommand(null);
    setError('');
  };

  const confirmPayment = () => {
    if (parsedCommand?.countdownInterval) {
      clearInterval(parsedCommand.countdownInterval);
    }
    if (parsedCommand) {
      processVoicePayment(transcript, parsedCommand.recipient._id);
    }
  };

  if (!SpeechRecognition) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">
          Speech recognition is not supported in this browser. 
          Please use Chrome, Edge, or Safari.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        🎤 Voice Payment
      </h3>

      {/* Debug Info */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg text-sm">
        <p><strong>Debug Info:</strong></p>
        <p>Users loaded: {users.length}</p>
        <p>Users: {users.map(u => u.firstName).join(', ') || 'None'}</p>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">
          Say: <strong>"Send 100 to John"</strong> or <strong>"Pay 50 to Sarah"</strong>
        </p>
        
        <div className="flex gap-2">
          <button
            onClick={startListening}
            disabled={isListening || isProcessing}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isListening 
                ? 'bg-red-500 text-white' 
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {isListening ? '🔴 Listening...' : '🎤 Start Voice Payment'}
          </button>
          
          {isListening && (
            <button
              onClick={stopListening}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Stop
            </button>
          )}
        </div>
      </div>

      {/* Available Users */}
      {users.length > 0 && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm font-medium text-blue-800 mb-1">Available Users:</p>
          <p className="text-sm text-blue-700">
            {users.map(user => user.firstName).join(', ')}
          </p>
        </div>
      )}

      {/* Live Transcript */}
      {transcript && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm font-medium text-gray-700">You said:</p>
          <p className="text-gray-900">"{transcript}"</p>
        </div>
      )}

      {/* Parsed Command Confirmation */}
      {parsedCommand && !isProcessing && (
        <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800 font-medium mb-2">⏳ Confirm Payment:</p>
          <div className="text-sm text-yellow-700 mb-3">
            <p><strong>Amount:</strong> ${parsedCommand.amount}</p>
            <p><strong>To:</strong> {parsedCommand.recipient.firstName} {parsedCommand.recipient.lastName}</p>
            <p><strong>Email:</strong> {parsedCommand.recipient.username}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={confirmPayment}
              className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
            >
              ✅ Confirm
            </button>
            <button
              onClick={cancelPayment}
              className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
            >
              ❌ Cancel
            </button>
          </div>
          <p className="text-xs text-yellow-600 mt-2">
            Auto-confirming in {parsedCommand.countdown || 5} seconds...
          </p>
        </div>
      )}

      {/* Processing State */}
      {isProcessing && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-blue-800">Processing payment...</p>
        </div>
      )}

      {/* Success Result */}
      {result && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 font-medium">✅ {result.message}</p>
          <p className="text-sm text-green-700">
            Amount: ${result.amount}
          </p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">❌ {error}</p>
        </div>
      )}

      {/* Instructions */}
      <div className="text-xs text-gray-500 mt-4">
        <p><strong>Voice Commands Examples:</strong></p>
        <ul className="list-disc ml-4 mt-1">
          <li>"Send 100 to John" - Sends $100 to John</li>
          <li>"Pay 25 to Sarah" - Pays $25 to Sarah</li>
          <li>"Transfer 75 to Mike" - Transfers $75 to Mike</li>
        </ul>
      </div>
    </div>
  );
};

export default VoicePayment;