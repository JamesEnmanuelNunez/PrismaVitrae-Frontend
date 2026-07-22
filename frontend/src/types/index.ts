export interface Candidato {
  id: string;
  no: number;
  reg_dist: string | null;
  regional: string | null;
  distrito: string | null;
  cedula: string | null;
  nombre: string;
  sexo: string | null;
  cargo_solicitado: string | null;
  escolaridad: string | null;
  en_sustitucion_de: string | null;
  cedula_no: string | null;
  fecha_ingreso: string | null;
  centro: string | null;
  referido_por: string | null;
  telefono: string | null;
  email: string | null;
  habilidades: string[];
  experiencia_anios: number;
  educacion: string | null;
  resumen: string | null;
  archivo_url: string | null;
  datos_crudos: Record<string, unknown>;
  confianza: number;
  created_at: string;
  updated_at: string;
}

export interface Propuesta {
  id: string;
  no: number;
  reg_dist: string | null;
  cedula: string;
  nombre_completo: string;
  sexo: string | null;
  cargo_solicitado: string | null;
  cargo_aprobado: string | null;
  escolaridad: string | null;
  en_sustitucion_de: string | null;
  cedula_no: string | null;
  fecha_ingreso: string | null;
  centro: string | null;
  referido_por: string | null;
  telefono: string | null;
  created_at: string;
  updated_at: string;
}

export interface Reajuste {
  id: string;
  cedula: string;
  nombre_completo: string;
  grupo_ocupacional: string | null;
  cargo: string | null;
  salario_actual: number;
  salario_solicitado: number;
  observacion: string | null;
  diferencia_salarial: number;
  porcentaje_incremento: number;
  fecha_efectividad: string | null;
  created_at: string;
  updated_at: string;
}

export interface NoProcede {
  id: string;
  no: number;
  reg_dist: string | null;
  cedula: string;
  nombre_completo: string;
  sexo: string | null;
  cargo_solicitado: string | null;
  salario_solicitado: number;
  escolaridad: string | null;
  observacion: string | null;
  referido_por: string | null;
  telefono: string | null;
  created_at: string;
  updated_at: string;
}

export interface ScanResult {
  candidato: Candidato;
}
