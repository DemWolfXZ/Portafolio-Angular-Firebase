/**
 * ARCHIVO: src/app/models/certification.model.ts
 *
 * DESCRIPCIÓN:
 * Modelo de datos para las certificaciones/credenciales verificables de Alejandro Villa.
 * Centraliza la información para no duplicar el arreglo entre el home (hero) y "Sobre mí".
 *
 * NOTA DE PRIVACIDAD: la imagen del título (DuocUC) usa solo el timbre/firma
 * (assets/certificaciones/titulo firma y timbre.png), NO el certificado completo,
 * porque ese PDF incluye RUT y ubicación. La verificación real se hace por el link
 * oficial con Código QR, sin exponer el documento completo.
 */

/** Certificación/credencial verificable con imagen y link de verificación oficial */
export interface Certification {
  /** ID único de la certificación */
  id: string;

  /** Nombre de la certificación/título */
  name: string;

  /** Institución/entidad que la emite */
  issuer: string;

  /** Ruta de la imagen representativa (badge, timbre, etc.) */
  image: string;

  /** Texto del botón de verificación */
  verificationLabel: string;

  /** URL oficial de verificación (QR/credencial digital) */
  url: string;
}

/**
 * Certificaciones de Alejandro Villa, ambas obtenidas en Chile y verificables
 * mediante su link oficial (QR de DuocUC / credencial digital de Acreditta).
 */
export const CERTIFICATIONS: Certification[] = [
  {
    id: 'titulo-duocuc',
    name: 'Ingeniería en Informática - DuocUC (2020-2025)',
    issuer: 'DuocUC',
    image: 'assets/certificaciones/titulo firma y timbre.png',
    verificationLabel: 'Verificar título',
    url: 'https://certificadovalida.duoc.cl/ValidacionQr?id=1649840354'
  },
  {
    id: 'python-fullstack',
    name: 'Python Full Stack Trainee - ECAS Otec / SENCE',
    issuer: 'Talento Digital para Chile',
    image: 'assets/certificaciones/python.png',
    verificationLabel: 'Ver credencial',
    url: 'https://acreditta.com/credential/6c865bcb-91f2-44fe-908e-1c512c71cfff'
  }
];
