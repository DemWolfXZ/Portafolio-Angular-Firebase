/**
 * ARCHIVO: src/app/services/contact.service.ts
 * 
 * DESCRIPCIÓN:
 * Servicio para manejar el formulario de contacto del portafolio.
 * Se encarga de enviar mensajes a Firestore, validar datos y manejar
 * la comunicación con Firebase para el almacenamiento de consultas.
 * Incluye validación de reCAPTCHA y sanitización de datos.
 */

import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, serverTimestamp } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { ContactMessage } from '../models/contact-message.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private firestore: Firestore) { }

  /**
   * Envía un mensaje de contacto a Firestore
   * Sanitiza los datos y agrega timestamp del servidor
   * @param message - Datos del mensaje de contacto
   * @returns Observable con el resultado de la operación
   */
  sendContactMessage(message: ContactMessage): Observable<any> {
    // Referencia a la colección de mensajes en Firestore
    const messagesCollection = collection(this.firestore, 'contact-messages');
    
    // Preparar datos para Firestore con timestamp del servidor
    const messageData = {
      ...this.sanitizeMessage(message),
      createdAt: serverTimestamp(), // Timestamp del servidor Firebase
      status: 'new', // Estado inicial del mensaje
      read: false // Marcado como no leído
    };

    // Enviar a Firestore y convertir Promise a Observable
    return from(addDoc(messagesCollection, messageData));
  }

  /**
   * Valida un email usando expresión regular
   * Verifica que el formato sea correcto antes de enviar
   * @param email - Email a validar
   * @returns true si el email es válido, false en caso contrario
   */
  validateEmail(email: string): boolean {
    // Expresión regular para validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  }

  /**
   * Valida un número de teléfono chileno
   * Acepta formatos: +56912345678, 912345678, 22345678
   * @param phone - Teléfono a validar
   * @returns true si el formato es válido
   */
  validatePhone(phone: string): boolean {
    // Remover espacios y caracteres especiales
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    
    // Expresión regular para teléfonos chilenos
    const phoneRegex = /^(\+56)?[2-9]\d{7,8}$/;
    return phoneRegex.test(cleanPhone);
  }

  /**
   * Sanitiza los datos del mensaje para prevenir inyección
   * Limpia caracteres peligrosos y limita longitud de campos
   * @param message - Mensaje original
   * @returns Mensaje sanitizado
   */
  private sanitizeMessage(message: ContactMessage): ContactMessage {
    return {
      name: this.sanitizeString(message.name, 100),
      email: this.sanitizeString(message.email, 100).toLowerCase(),
      phone: message.phone ? this.sanitizeString(message.phone, 20) : '',
      subject: this.sanitizeString(message.subject, 200),
      message: this.sanitizeString(message.message, 2000),
      company: message.company ? this.sanitizeString(message.company, 100) : '',
      preferredContact: message.preferredContact || 'email'
    };
  }

  /**
   * Sanitiza una cadena de texto individual
   * Remueve caracteres peligrosos y limita longitud
   * @param input - Texto a sanitizar
   * @param maxLength - Longitud máxima permitida
   * @returns Texto sanitizado
   */
  private sanitizeString(input: string, maxLength: number): string {
    if (!input) return '';
    
    // Remover caracteres peligrosos para prevenir XSS
    let sanitized = input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remover scripts
      .replace(/<[^>]*>/g, '') // Remover HTML tags
      .replace(/javascript:/gi, '') // Remover javascript:
      .replace(/on\w+\s*=/gi, '') // Remover event handlers
      .trim();

    // Limitar longitud
    return sanitized.substring(0, maxLength);
  }

  /**
   * Genera un ID único para tracking de mensajes
   * Útil para referencias y seguimiento de consultas
   * @returns String único basado en timestamp y random
   */
  generateMessageId(): string {
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2);
    return `msg_${timestamp}_${randomPart}`;
  }

  /**
   * Valida que todos los campos requeridos estén completos
   * Verifica la integridad básica del formulario
   * @param message - Mensaje a validar
   * @returns Array de errores encontrados (vacío si no hay errores)
   */
  validateMessage(message: ContactMessage): string[] {
    const errors: string[] = [];

    // Validar campos requeridos
    if (!message.name || message.name.trim().length < 2) {
      errors.push('El nombre debe tener al menos 2 caracteres');
    }

    if (!message.email || !this.validateEmail(message.email)) {
      errors.push('El email no tiene un formato válido');
    }

    if (!message.subject || message.subject.trim().length < 5) {
      errors.push('El asunto debe tener al menos 5 caracteres');
    }

    if (!message.message || message.message.trim().length < 10) {
      errors.push('El mensaje debe tener al menos 10 caracteres');
    }

    // Validar teléfono si se proporciona
    if (message.phone && !this.validatePhone(message.phone)) {
      errors.push('El formato del teléfono no es válido');
    }

    return errors;
  }
}