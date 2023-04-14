package com.hu.chatservice.domains

import com.hu.chatservice.enums.Status
import java.util.Date

data class Message(
    val senderName: String? = null,
    val receiverName: String? = null,
    val message: String? = null,
    val date: Date? = null,
    val status: Status? = null
)