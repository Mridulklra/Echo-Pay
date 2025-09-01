import express from "express";
import mongoose from "mongoose";
import { authMiddleware } from "../middleware.js";
import { Account } from "../db.js";

const router = express.Router();

// ---------------- Get Balance ----------------
router.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({ userId: req.userId });
  
  if (!account) {
    return res.status(404).json({ message: "Account not found" });
  }

  res.json({ balance: account.account });
});

// ---------------- Transfer Money ----------------
router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  
  try {
    // FIX 1: Start transaction after try block begins
    session.startTransaction();
    
    const { amount, to } = req.body;
    const transferAmount = Number(amount);

    if (isNaN(transferAmount) || transferAmount <= 0) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Invalid amount" });
    }

    // Fetch accounts within the transaction
    const fromAccount = await Account.findOne({ userId: req.userId }).session(session);
    if (!fromAccount || fromAccount.account < transferAmount) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Insufficient balance" });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);
    if (!toAccount) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Invalid account" });
    }

    // FIX 2: Add await to updateOne operations and ensure they use the session
    await Account.updateOne(
      { userId: req.userId },
      { $inc: { account: -transferAmount } },
      { session: session } // FIX 3: Pass session as options object
    );

    await Account.updateOne(
      { userId: to },
      { $inc: { account: transferAmount } },
      { session: session } // FIX 4: Pass session as options object
    );

    // Commit the transaction
    await session.commitTransaction();
    res.json({ message: "Transfer successful" });
    
  } catch (err) {
    // FIX 5: Ensure transaction is aborted in catch block
    await session.abortTransaction();
    console.error("Transfer error:", err);
    res.status(500).json({ message: "Transaction failed" });
  } finally {
    // FIX 6: Always end session in finally block
    await session.endSession();
  }
});



// ---------------- Voice Payment Processing ----------------
// Replace your voice-payment route with this exact code:

// ---------------- Voice Payment Processing ----------------
router.post("/voice-payment", authMiddleware, async (req, res) => {
  console.log("Voice payment route hit!"); // Debug log
  console.log("Request body:", req.body); // Debug log
  
  try {
    const { voiceCommand, recipientId } = req.body;
    
    // Enhanced voice command parsing
    const parseVoiceCommand = (command) => {
      // Convert to lowercase for easier parsing
      const lowerCommand = command.toLowerCase().trim();
      console.log("Parsing command:", lowerCommand); // Debug log
      
      // Extract amount using regex
      // Matches patterns like "send 100", "pay 50", "transfer 25.5"
      const amountMatch = lowerCommand.match(/(?:send|pay|transfer)\s+(\d+(?:\.\d{1,2})?)/);
      
      if (!amountMatch) {
        throw new Error("Could not understand the amount. Please say 'send 100 to John' or 'pay 50 to Sarah'");
      }
      
      const amount = parseFloat(amountMatch[1]);
      
      if (amount <= 0) {
        throw new Error("Amount must be greater than 0");
      }
      
      // FIXED: Extract recipient name (after "to") - Updated to handle punctuation
      const toMatch = lowerCommand.match(/to\s+([a-zA-Z\s]+)[\.\,\!\?]?$/);
      const recipientName = toMatch ? toMatch[1].trim().replace(/[\.\,\!\?]$/, '') : 'Unknown';
      
      console.log("Parsed amount:", amount, "recipient:", recipientName); // Debug log
      
      return { amount, recipientName };
    };
    
    // Parse the voice command
    const { amount, recipientName } = parseVoiceCommand(voiceCommand);
    
    // Validation
    if (!recipientId) {
      return res.status(400).json({ 
        message: "Recipient not specified",
        success: false 
      });
    }
    
    // Use your existing transfer logic
    const session = await mongoose.startSession();
    
    try {
      session.startTransaction();
      
      const transferAmount = Number(amount);
      
      // Check sender's balance
      const fromAccount = await Account.findOne({ userId: req.userId }).session(session);
      if (!fromAccount || fromAccount.account < transferAmount) {
        await session.abortTransaction();
        return res.status(400).json({ 
          message: "Insufficient balance",
          success: false 
        });
      }
      
      // Check recipient exists
      const toAccount = await Account.findOne({ userId: recipientId }).session(session);
      if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({ 
          message: "Recipient account not found",
          success: false 
        });
      }
      
      // Perform transfer
      await Account.updateOne(
        { userId: req.userId },
        { $inc: { account: -transferAmount } },
        { session: session }
      );
      
      await Account.updateOne(
        { userId: recipientId },
        { $inc: { account: transferAmount } },
        { session: session }
      );
      
      await session.commitTransaction();
      
      console.log("Payment successful!"); // Debug log
      
      res.json({ 
        message: `Voice payment successful! Sent $${transferAmount} to ${recipientName} via voice command`,
        success: true,
        amount: transferAmount,
        parsedCommand: voiceCommand,
        recipientName: recipientName
      });
      
    } catch (err) {
      await session.abortTransaction();
      throw err;
    } finally {
      await session.endSession();
    }
    
  } catch (error) {
    console.error("Voice payment error:", error);
    res.status(500).json({ 
      message: error.message || "Voice payment failed",
      success: false 
    });
  }
});
export default router;