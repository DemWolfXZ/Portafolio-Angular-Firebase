/**
 * ARCHIVO: src/app/models/contact-message.model.ts
 * 
 * DESCRIPCIÓN:
 * Modelo de datos para los mensajes de contacto del portafolio.
 * Define la estructura de datos que se envía a través del formulario
 * de contacto y se almacena en Firestore. Alineado con ContactService
 * para garantizar consistencia en validaciones y procesamiento.
 */

/**
 * Interfaz principal para los mensajes de contacto
 * Estructura exacta utilizada por ContactService.sendContactMessage()
 */
export interface ContactMessage {
  /** Nombre completo del remitente - Campo requerido (min 2, max 100 chars) */
  name: string;
  
  /** Email de contacto - Campo requerido y validado con regex */
  email: string;
  
  /** Número de teléfono chileno - Campo opcional (formato: +56912345678) */
  phone?: string;
  
  /** Asunto del mensaje - Campo requerido (min 5, max 200 chars) */
  subject: string;
  
  /** Contenido del mensaje - Campo requerido (min 10, max 2000 chars) */
  message: string;
  
  /** Empresa u organización - Campo opcional (max 100 chars) */
  company?: string;
  
  /** Método de contacto preferido por el usuario */
  preferredContact: ContactMethod;
}

/**
 * Tipos de métodos de contacto disponibles
 * Utilizados en ContactService.validateMessage()
 */
export type ContactMethod = 'email' | 'phone' | 'whatsapp' | 'linkedin';

/**
 * Interfaz para datos almacenados en Firestore
 * Incluye campos adicionales agregados por ContactService
 */
export interface FirestoreContactMessage extends ContactMessage {
  /** Timestamp del servidor Firebase - Agregado automáticamente */
  createdAt: any; // serverTimestamp() de Firebase
  
  /** Estado inicial del mensaje - Siempre 'new' al crear */
  status: MessageStatus;
  
  /** Marcado como no leído inicialmente */
  read: boolean;
  
  /** ID único generado por generateMessageId() */
  messageId?: string;
}

/**
 * Estados posibles de un mensaje de contacto
 * Usado para seguimiento en panel de administración
 */
export type MessageStatus = 'new' | 'read' | 'replied' | 'archived';

/**
 * Interfaz para errores de validación del formulario
 * Retornada por ContactService.validateMessage()
 */
export interface ContactFormErrors {
  /** Errores específicos por campo */
  fieldErrors: {
    name?: string[];
    email?: string[];
    phone?: string[];
    subject?: string[];
    message?: string[];
    company?: string[];
  };
  
  /** Errores generales del formulario */
  generalErrors: string[];
  
  /** Indica si el formulario es válido */
  isValid: boolean;
}

/**
 * Configuración de validación para campos del formulario
 * Alineada con las validaciones de ContactService
 */
export interface FieldValidation {
  /** Si el campo es requerido */
  required: boolean;
  
  /** Longitud mínima de caracteres */
  minLength?: number;
  
  /** Longitud máxima de caracteres */
  maxLength?: number;
  
  /** Expresión regular para validación */
  pattern?: RegExp;
  
  /** Mensaje de error personalizado */
  errorMessage?: string;
}

/**
 * Mapa de validaciones que coincide exactamente con ContactService
 * Usado para validaciones en frontend antes del envío
 */
export const CONTACT_VALIDATIONS: { [key in keyof Omit<ContactMessage, 'preferredContact'>]?: FieldValidation } = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 100,
    errorMessage: 'El nombre debe tener entre 2 y 100 caracteres'
  },
  email: {
    required: true,
    maxLength: 100,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Misma regex que ContactService.validateEmail()
    errorMessage: 'El email no tiene un formato válido'
  },
  phone: {
    required: false,
    maxLength: 20,
    pattern: /^(\+56)?[2-9]\d{7,8}$/, // Misma regex que ContactService.validatePhone()
    errorMessage: 'Formato de teléfono chileno inválido'
  },
  subject: {
    required: true,
    minLength: 5,
    maxLength: 200,
    errorMessage: 'El asunto debe tener entre 5 y 200 caracteres'
  },
  message: {
    required: true,
    minLength: 10,
    maxLength: 2000,
    errorMessage: 'El mensaje debe tener entre 10 y 2000 caracteres'
  },
  company: {
    required: false,
    maxLength: 100,
    errorMessage: 'El nombre de la empresa no puede exceder 100 caracteres'
  }
};

/**
 * Opciones predefinidas para el campo de asunto
 * Facilita la categorización automática de mensajes
 */
export const SUBJECT_OPTIONS = [
  {
    value: 'trabajo',
    label: 'Oportunidad Laboral',
    description: 'Ofertas de trabajo, entrevistas, colaboraciones',
    icon: 'briefcase'
  },
  {
    value: 'proyecto',
    label: 'Propuesta de Proyecto',
    description: 'Proyectos freelance, desarrollos específicos',
    icon: 'bulb'
  },
  {
    value: 'consultoria',
    label: 'Consultoría Técnica',
    description: 'Asesorías, análisis de sistemas, coordinación',
    icon: 'analytics'
  },
  {
    value: 'colaboracion',
    label: 'Colaboración',
    description: 'Partnerships, alianzas, networking',
    icon: 'people'
  },
  {
    value: 'informacion',
    label: 'Solicitud de Información',
    description: 'Preguntas generales, dudas técnicas',
    icon: 'help-circle'
  },
  {
    value: 'otro',
    label: 'Otro Asunto',
    description: 'Temas no cubiertos en las categorías anteriores',
    icon: 'chatbubble'
  }
];

/**
 * Métodos de contacto con información detallada
 * Usado para mostrar opciones en el formulario
 */
export const CONTACT_METHODS = [
  {
    value: 'email' as ContactMethod,
    label: 'Email',
    description: 'Respuesta por correo electrónico',
    icon: 'mail',
    isDefault: true
  },
  {
    value: 'phone' as ContactMethod,
    label: 'Teléfono',
    description: 'Llamada telefónica',
    icon: 'call',
    requiresPhone: true
  },
  {
    value: 'whatsapp' as ContactMethod,
    label: 'WhatsApp',
    description: 'Mensaje por WhatsApp',
    icon: 'logo-whatsapp',
    requiresPhone: true
  },
  {
    value: 'linkedin' as ContactMethod,
    label: 'LinkedIn',
    description: 'Mensaje por LinkedIn',
    icon: 'logo-linkedin'
  }
];

/**
 * Factory function para crear un ContactMessage vacío con valores por defecto
 * Útil para inicializar formularios
 */
export function createEmptyContactMessage(): ContactMessage {
  return {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    company: '',
    preferredContact: 'email'
  };
}

/**
 * Helper function para verificar si un ContactMessage está completo
 * Verifica campos requeridos básicos antes de validación completa
 */
export function isContactMessageComplete(message: Partial<ContactMessage>): message is ContactMessage {
  return !!(
    message.name &&
    message.email &&
    message.subject &&
    message.message &&
    message.preferredContact
  );
}