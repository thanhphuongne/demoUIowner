import { create } from 'zustand';
import { Field } from '../types';
import { fieldService } from '../services/fieldService';

interface FieldStore {
  fields: Field[];
  selectedField: Field | null;
  loading: boolean;
  error: string | null;
  
  fetchFields: () => Promise<void>;
  fetchField: (id: string) => Promise<void>;
  createField: (fieldData: Omit<Field, 'id' | 'rating' | 'totalBookings'>) => Promise<void>;
  updateField: (id: string, updates: Partial<Field>) => Promise<void>;
  deleteField: (id: string) => Promise<void>;
  clearError: () => void;
}

export const useFieldStore = create<FieldStore>((set, get) => ({
  fields: [],
  selectedField: null,
  loading: false,
  error: null,

  fetchFields: async () => {
    set({ loading: true, error: null });
    
    try {
      const fields = await fieldService.getFields();
      set({ fields, loading: false });
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Lỗi tải danh sách sân' 
      });
    }
  },

  fetchField: async (id: string) => {
    set({ loading: true, error: null });
    
    try {
      const field = await fieldService.getField(id);
      set({ selectedField: field, loading: false });
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Lỗi tải thông tin sân' 
      });
    }
  },

  createField: async (fieldData: Omit<Field, 'id' | 'rating' | 'totalBookings'>) => {
    set({ loading: true, error: null });
    
    try {
      const newField = await fieldService.createField(fieldData);
      set(state => ({
        fields: [...state.fields, newField],
        loading: false
      }));
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Lỗi tạo sân mới' 
      });
      throw error;
    }
  },

  updateField: async (id: string, updates: Partial<Field>) => {
    set({ loading: true, error: null });
    
    try {
      const updatedField = await fieldService.updateField(id, updates);
      set(state => ({
        fields: state.fields.map(field => 
          field.id === id ? updatedField : field
        ),
        selectedField: state.selectedField?.id === id ? updatedField : state.selectedField,
        loading: false
      }));
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Lỗi cập nhật sân' 
      });
      throw error;
    }
  },

  deleteField: async (id: string) => {
    set({ loading: true, error: null });
    
    try {
      await fieldService.deleteField(id);
      set(state => ({
        fields: state.fields.filter(field => field.id !== id),
        selectedField: state.selectedField?.id === id ? null : state.selectedField,
        loading: false
      }));
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Lỗi xóa sân' 
      });
      throw error;
    }
  },

  clearError: () => set({ error: null })
}));