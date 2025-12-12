#!/usr/bin/env node
/**
 * Simple script to view contact form messages
 * Usage: node view-messages.js [password]
 */

import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const MESSAGES_FILE = join(__dirname, 'messages.json');

async function viewMessages() {
  try {
    const data = await readFile(MESSAGES_FILE, 'utf8');
    const messages = JSON.parse(data);
    
    console.log('\n📨 Contact Form Messages\n');
    console.log(`Total messages: ${messages.length}\n`);
    
    if (messages.length === 0) {
      console.log('No messages yet.');
      return;
    }
    
    messages.forEach((msg, index) => {
      console.log(`\n--- Message ${index + 1} ${msg.read ? '(read)' : '(NEW)'} ---`);
      console.log(`ID: ${msg.id}`);
      console.log(`From: ${msg.name} <${msg.email}>`);
      if (msg.subject) console.log(`Subject: ${msg.subject}`);
      console.log(`Date: ${new Date(msg.timestamp).toLocaleString()}`);
      console.log(`Message:`);
      console.log(msg.message);
      console.log('');
    });
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('No messages file found. Messages will be created when first contact form is submitted.');
    } else {
      console.error('Error reading messages:', error.message);
    }
  }
}

viewMessages();

