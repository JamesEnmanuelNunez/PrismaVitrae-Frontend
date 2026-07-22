import axios from 'axios';
import type { Candidato, Propuesta, Reajuste, NoProcede } from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

import { supabase } from '../lib/supabase';

// Este interceptor atrapa TODAS las peticiones antes de salir
api.interceptors.request.use(
  async (config) => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session?.access_token) {
      config.headers.Authorization = `Bearer ${session.access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Candidatos
export const candidatosApi = {
  list: (offset = 0, limit = 20) =>
    api.get<Candidato[]>('/candidatos/', { params: { offset, limit } }).then((r) => r.data),
  get: (id: string) =>
    api.get<Candidato>(`/candidatos/${id}`).then((r) => r.data),
  create: (data: Partial<Candidato>) =>
    api.post<Candidato>('/candidatos/', data).then((r) => r.data),
  update: (id: string, data: Partial<Candidato>) =>
    api.put<Candidato>(`/candidatos/${id}`, data).then((r) => r.data),
  delete: (id: string) =>
    api.delete(`/candidatos/${id}`),
};

// Propuestas
export const propuestasApi = {
  list: (offset = 0, limit = 20) =>
    api.get<Propuesta[]>('/propuestas/', { params: { offset, limit } }).then((r) => r.data),
  get: (id: string) =>
    api.get<Propuesta>(`/propuestas/${id}`).then((r) => r.data),
  create: (data: Partial<Propuesta>) =>
    api.post<Propuesta>('/propuestas/', data).then((r) => r.data),
  update: (id: string, data: Partial<Propuesta>) =>
    api.put<Propuesta>(`/propuestas/${id}`, data).then((r) => r.data),
  delete: (id: string) =>
    api.delete(`/propuestas/${id}`),
};

// Reajustes
export const reajustesApi = {
  list: (offset = 0, limit = 20) =>
    api.get<Reajuste[]>('/reajustes/', { params: { offset, limit } }).then((r) => r.data),
  get: (id: string) =>
    api.get<Reajuste>(`/reajustes/${id}`).then((r) => r.data),
  create: (data: Partial<Reajuste>) =>
    api.post<Reajuste>('/reajustes/', data).then((r) => r.data),
  update: (id: string, data: Partial<Reajuste>) =>
    api.put<Reajuste>(`/reajustes/${id}`, data).then((r) => r.data),
  delete: (id: string) =>
    api.delete(`/reajustes/${id}`),
};

// No Proceden
export const noProcedenApi = {
  list: (offset = 0, limit = 20) =>
    api.get<NoProcede[]>('/no-proceden/', { params: { offset, limit } }).then((r) => r.data),
  get: (id: string) =>
    api.get<NoProcede>(`/no-proceden/${id}`).then((r) => r.data),
  create: (data: Partial<NoProcede>) =>
    api.post<NoProcede>('/no-proceden/', data).then((r) => r.data),
  update: (id: string, data: Partial<NoProcede>) =>
    api.put<NoProcede>(`/no-proceden/${id}`, data).then((r) => r.data),
  delete: (id: string) =>
    api.delete(`/no-proceden/${id}`),
};

// Scanner
export const scannerApi = {
  scan: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post<Candidato>('/escanear/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then((r) => r.data);
  },
};

// Export
export const exportApi = {
  downloadExcel: (tabla: string) =>
    api.get(`/exportar-excel/${tabla}`, { responseType: 'blob' }).then((r) => {
      const url = window.URL.createObjectURL(new Blob([r.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${tabla}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    }),
};
