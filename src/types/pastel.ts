import { Decimal } from '@prisma/client/runtime/library';

export interface Pastel {
  id: number;
  nombre: string;
  descripcion: string | null;
  precio: Decimal;
  imagen: string | null;
  destacado: boolean | null;
  stock: number | null;
  disponible: boolean | null;
  fecha_creacion: Date | null;
  deleted: boolean | null;
} 