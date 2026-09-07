/**
 * ARCHIVO: src/app/components/contact-section/contact-section.component.ts
 *
 * DESCRIPCIÓN:
 * Componente para la sección de contacto del portafolio.
 * ACTUALIZADO: Información de contacto alineada con el posicionamiento actual:
 * QA Técnico & Soporte TI N2 · Desarrollo Frontend Jr, buscando oportunidades
 * remotas en QA, soporte y desarrollo frontend.
 */

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { DownloadService } from '../../services/download.service';
import { AnimationService } from '../../services/animation.service';
import {
  ContactMessage,
  SUBJECT_OPTIONS,
  CONTACT_METHODS,
  ContactMethod,
  createEmptyContactMessage
} from '../../models/contact-message.model';

@Component({
  selector: 'app-contact-section',
  templateUrl: './contact-section.component.html',
  styleUrls: ['./contact-section.component.scss']
})
export class ContactSectionComponent implements OnInit {

  // Formulario reactivo
  public contactForm!: FormGroup;

  // Datos del formulario (selects, radios, etc.)
  public subjectOptions = SUBJECT_OPTIONS;
  public contactMethods = CONTACT_METHODS;

  // Estados del componente
  public isSubmitting = false;
  public submitSuccess = false;
  public submitError = false;
  public errorMessage = '';
  public animationsLoaded = false;

  /**
   * Información de contacto mostrada en la sección.
   * IMPORTANTE: Debe estar alineada con el hero, footer y el CV.
   */
  public contactInfo = {
    name: 'Alejandro Villa Villavicencio',
    // Alineado con el título principal del portafolio
    title: 'QA Técnico & Soporte TI N2 · Desarrollo Frontend Jr',
    email: 'alejandro.villa91@gmail.com',
    phone: '+56 920913551',
    // Unificamos ubicación con el resto del sitio
    location: 'Macul, Santiago, Chile',
    linkedin: 'https://www.linkedin.com/in/alejandro-villa-villavicencio/',
    // Enfoque realista según tu perfil actual
    availability: 'Disponible para roles en QA, Soporte TI N2 y desarrollo frontend junior (idealmente remoto).',
    responseTime: 'Respuesta típica: 24-48 horas'
  };

  // Opciones de horario de contacto
  public availabilitySchedule = [
    {
      day: 'Lunes a Viernes',
      hours: '9:00 - 18:00',
      timezone: 'CLT (Chile)',
      icon: 'business'
    },
    {
      day: 'Fines de Semana',
      hours: 'Consultas por email',
      timezone: 'Respuesta lunes',
      icon: 'mail'
    }
  ];

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private downloadService: DownloadService,
    private animationService: AnimationService
  ) {
    // Inicializamos el formulario reactivo en el constructor
    this.initializeForm();
  }

  ngOnInit(): void {
    // Activar animaciones después de un pequeño delay para efecto de entrada
    setTimeout(() => {
      this.animationsLoaded = true;
      this.initAnimations();
    }, 300);
  }

  /**
   * Maneja el error de carga de avatar reemplazando con un icono
   * @param event - Evento de error de imagen
   */
  onAvatarError(event: Event): void {
    const target = event.target as HTMLImageElement;
    if (target && target.parentElement) {
      // Crear ion-icon de reemplazo
      const iconElement = document.createElement('ion-icon');
      iconElement.name = 'person-circle';
      iconElement.className = 'avatar-icon-fallback';
      iconElement.style.cssText = 'font-size: 80px; color: var(--ion-color-medium);';

      // Reemplazar img con ion-icon
      target.parentElement.replaceChild(iconElement, target);
    }
  }

  /**
   * Inicializa el formulario reactivo con validaciones
   */
  private initializeForm(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      phone: ['', [Validators.maxLength(20)]],
      company: ['', [Validators.maxLength(100)]],
      subject: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(2000)]],
      preferredContact: ['email', [Validators.required]]
    });
  }

  /**
   * Maneja el envío del formulario
   */
  async onSubmit(): Promise<void> {
    if (this.contactForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.isSubmitting = true;
    this.submitError = false;
    this.submitSuccess = false;

    try {
      // Crear objeto ContactMessage desde el formulario
      const contactMessage: ContactMessage = {
        name: this.contactForm.value.name,
        email: this.contactForm.value.email,
        phone: this.contactForm.value.phone || '',
        company: this.contactForm.value.company || '',
        subject: this.contactForm.value.subject,
        message: this.contactForm.value.message,
        preferredContact: this.contactForm.value.preferredContact
      };

      // Validar mensaje con el servicio
      const validationErrors = this.contactService.validateMessage(contactMessage);

      if (validationErrors.length > 0) {
        this.errorMessage = validationErrors.join(', ');
        this.submitError = true;
        return;
      }

      // Enviar mensaje a Firestore (o destino configurado en el servicio)
      await this.contactService.sendContactMessage(contactMessage).toPromise();

      // Mostrar éxito y resetear formulario
      this.submitSuccess = true;
      this.contactForm.reset();
      this.initializeForm();

      // Ocultar mensaje de éxito después de 5 segundos
      setTimeout(() => {
        this.submitSuccess = false;
      }, 5000);

    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      this.errorMessage = 'Error al enviar el mensaje. Por favor, inténtalo de nuevo.';
      this.submitError = true;
    } finally {
      this.isSubmitting = false;
    }
  }

  /**
   * Marca todos los campos del formulario como touched para mostrar errores
   */
  private markFormGroupTouched(): void {
    Object.keys(this.contactForm.controls).forEach(key => {
      const control = this.contactForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }

  /**
   * Verifica si un campo específico tiene errores y ha sido touched
   * @param fieldName - Nombre del campo a verificar
   * @returns true si el campo tiene errores
   */
  hasFieldError(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  /**
   * Obtiene el mensaje de error para un campo específico
   * @param fieldName - Nombre del campo
   * @returns String con el mensaje de error
   */
  getFieldError(fieldName: string): string {
    const field = this.contactForm.get(fieldName);

    if (!field || !field.errors) return '';

    if (field.errors['required']) {
      return `${this.getFieldLabel(fieldName)} es requerido`;
    }

    if (field.errors['email']) {
      return 'El email no tiene un formato válido';
    }

    if (field.errors['minlength']) {
      const min = field.errors['minlength'].requiredLength;
      return `${this.getFieldLabel(fieldName)} debe tener al menos ${min} caracteres`;
    }

    if (field.errors['maxlength']) {
      const max = field.errors['maxlength'].requiredLength;
      return `${this.getFieldLabel(fieldName)} no puede exceder ${max} caracteres`;
    }

    return 'Campo inválido';
  }

  /**
   * Obtiene el label descriptivo de un campo
   * @param fieldName - Nombre del campo
   * @returns Label del campo
   */
  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      'name': 'El nombre',
      'email': 'El email',
      'phone': 'El teléfono',
      'company': 'La empresa',
      'subject': 'El asunto',
      'message': 'El mensaje',
      'preferredContact': 'El método de contacto preferido'
    };
    return labels[fieldName] || fieldName;
  }

  /**
   * Actualiza la validación del teléfono cuando cambia el método de contacto
   */
  onPreferredContactChange(): void {
    const preferredContact = this.contactForm.get('preferredContact')?.value;
    const phoneControl = this.contactForm.get('phone');

    if (preferredContact === 'phone' || preferredContact === 'whatsapp') {
      // Hacer teléfono requerido si se prefiere contacto telefónico
      phoneControl?.setValidators([Validators.required, Validators.maxLength(20)]);
    } else {
      // Teléfono opcional para otros métodos
      phoneControl?.setValidators([Validators.maxLength(20)]);
    }

    phoneControl?.updateValueAndValidity();
  }

  /**
   * Descarga el CV desde la sección de contacto
   */
  async downloadCV(): Promise<void> {
    try {
      await this.downloadService.downloadCV();
    } catch (error) {
      console.error('Error al descargar CV:', error);
    }
  }

  /**
   * Abre LinkedIn en nueva pestaña
   */
  openLinkedIn(): void {
    window.open(this.contactInfo.linkedin, '_blank', 'noopener,noreferrer');
  }

  /**
   * Inicia llamada telefónica
   */
  callPhone(): void {
    window.open(`tel:${this.contactInfo.phone}`, '_self');
  }

  /**
   * Abre cliente de email con asunto predefinido
   */
  sendDirectEmail(): void {
    const subject = 'Contacto desde Portafolio - Alejandro Villa';
    const mailtoUrl = `mailto:${this.contactInfo.email}?subject=${encodeURIComponent(subject)}`;
    window.open(mailtoUrl, '_self');
  }

  /**
   * Abre WhatsApp con mensaje predefinido
   */
  openWhatsApp(): void {
    const message = 'Hola Alejandro, te contacto desde tu portafolio web para...';
    const phoneNumber = this.contactInfo.phone.replace(/[^\d]/g, '');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  }

  /**
   * Navega al inicio del portafolio
   */
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  /**
   * Copia el email al portapapeles
   */
  async copyEmail(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.contactInfo.email);
      // Aquí podrías mostrar un toast de confirmación
    } catch (error) {
      console.warn('No se pudo copiar al portapapeles:', error);
    }
  }

  /**
   * Obtiene el conteo de caracteres restantes para un campo
   * @param fieldName - Nombre del campo
   * @param maxLength - Longitud máxima permitida
   * @returns Número de caracteres restantes
   */
  getRemainingChars(fieldName: string, maxLength: number): number {
    const field = this.contactForm.get(fieldName);
    const currentLength = field?.value?.length || 0;
    return maxLength - currentLength;
  }

  /**
   * Verifica si se está acercando al límite de caracteres
   * @param fieldName - Nombre del campo
   * @param maxLength - Longitud máxima
   * @returns true si está cerca del límite
   */
  isNearLimit(fieldName: string, maxLength: number): boolean {
    const remaining = this.getRemainingChars(fieldName, maxLength);
    return remaining <= maxLength * 0.1; // 10% del límite
  }

  /**
   * Inicializa animaciones para elementos de la sección
   */
  private initAnimations(): void {
    // Animar elementos principales (títulos, tarjetas, etc.)
    const animatedElements = document.querySelectorAll('.contact-animate');

    animatedElements.forEach((element, index) => {
      this.animationService.observeElement(
        element,
        'slideInUp',
        0.1
      );
    });

    // Animar campos del formulario con delay escalonado
    const formFields = document.querySelectorAll('.form-field');
    formFields.forEach((field, index) => {
      setTimeout(() => {
        this.animationService.observeElement(field, 'slideInLeft', 0.2);
      }, index * 100);
    });
  }
}
