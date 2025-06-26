'use client'
import React, { useEffect, useState, useCallback, useRef } from 'react';
import FieldForm from '../field/FieldForm';
import FieldCard from '../field/FieldCard';
import FieldDetailModal from '../field/FieldDetailModal';
import { useFieldStore } from '../../stores/fieldStore';
import { Plus } from 'lucide-react';
import { Field } from '../../types';

const ManageFieldPage: React.FC = () => {
  const { 
    fields, 
    loading, 
    error, 
    fetchFields, 
    createField, 
    updateField 
  } = useFieldStore();
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingField, setEditingField] = useState<Field | null>(null);
  const [viewingField, setViewingField] = useState<Field | null>(null);
  
  // Sử dụng ref để track submit requests
  const submitInProgress = useRef(false);
  const hasFetched = useRef(false);

  useEffect(() => {
    // Chỉ fetch một lần
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchFields();
    }
  }, [fetchFields]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const handleAddField = useCallback(async (fieldData: Omit<Field, 'id' | 'rating' | 'totalBookings'>) => {
    // Ngăn chặn multiple submits
    if (submitInProgress.current) {
      console.log('Submit already in progress, ignoring...');
      return;
    }
    
    submitInProgress.current = true;
    
    try {
      await createField(fieldData);
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding field:', error);
    } finally {
      submitInProgress.current = false;
    }
  }, [createField]);

  const handleUpdateField = useCallback(async (fieldData: Omit<Field, 'id' | 'rating' | 'totalBookings'>) => {
    if (!editingField || submitInProgress.current) {
      return;
    }
    
    submitInProgress.current = true;
    
    try {
      await updateField(editingField.id, fieldData);
      setEditingField(null);
    } catch (error) {
      console.error('Error updating field:', error);
    } finally {
      submitInProgress.current = false;
    }
  }, [editingField, updateField]);

  const handleCancelForm = useCallback(() => {
    if (submitInProgress.current) return;
    setShowAddForm(false);
    setEditingField(null);
  }, []);

  if (loading && fields.length === 0) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p>Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 text-red-600 rounded-full p-3 inline-block mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">Không tải được dữ liệu</h3>
          <p className="text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản Lý Sân</h1>
          <p className="text-gray-600">Quản lý thông tin và cài đặt các sân thể thao</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50"
          disabled={showAddForm || editingField !== null || submitInProgress.current}
        >
          <Plus className="w-5 h-5" />
          <span>Thêm Sân Mới</span>
        </button>
      </div>

      {/* Form thêm/sửa sân */}
      {(showAddForm || editingField) && (
        <div className="p-6">
          <FieldForm
            field={editingField || undefined}
            onSubmit={editingField ? handleUpdateField : handleAddField}
            onCancel={handleCancelForm}
          />
        </div>
      )}

      {/* Danh sách sân */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fields.map((field) => (
          <FieldCard
            key={field.id}
            field={field}
            onView={() => setViewingField(field)}
            onEdit={() => setEditingField(field)}
            formatCurrency={formatCurrency}
          />
        ))}
      </div>

      {/* Modal xem chi tiết sân */}
      {viewingField && (
        <FieldDetailModal
          field={viewingField}
          onClose={() => setViewingField(null)}
          formatCurrency={formatCurrency}
        />
      )}
    </div>
  );
};

export default ManageFieldPage;