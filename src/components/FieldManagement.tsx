import React, { useState } from 'react';
import { 
  Plus, 
  Edit, 
  Eye, 
  MapPin, 
  Clock, 
  DollarSign,
  Users,
  Star,
  Calendar,
  Camera,
  Save,
  X
} from 'lucide-react';
import { Field } from '../types';

interface FieldManagementProps {
  fields: Field[];
  onUpdateField: (field: Field) => void;
  onAddField: (field: Omit<Field, 'id'>) => void;
}

const FieldManagement: React.FC<FieldManagementProps> = ({ fields, onUpdateField, onAddField }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingField, setEditingField] = useState<Field | null>(null);
  const [viewingField, setViewingField] = useState<Field | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    sport: '',
    description: '',
    images: [''],
    amenities: [],
    hourlyRate: 0,
    peakRate: 0,
    openTime: '06:00',
    closeTime: '22:00',
    location: '',
    capacity: 0
  });

  const sportTypes = ['Football', 'Tennis', 'Badminton', 'Basketball', 'Volleyball'];
  const availableAmenities = ['Parking', 'Lighting', 'Changing Room', 'Shower', 'Water', 'Air Conditioning', 'Sound System', 'Equipment Rental', 'Seating'];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const handleAddField = () => {
    setShowAddForm(true);
    setFormData({
      name: '',
      sport: '',
      description: '',
      images: [''],
      amenities: [],
      hourlyRate: 0,
      peakRate: 0,
      openTime: '06:00',
      closeTime: '22:00',
      location: '',
      capacity: 0
    });
  };

  const handleEditField = (field: Field) => {
    setEditingField(field);
    setFormData({
      name: field.name,
      sport: field.sport,
      description: field.description,
      images: field.images,
      amenities: field.amenities,
      hourlyRate: field.hourlyRate,
      peakRate: field.peakRate,
      openTime: field.openTime,
      closeTime: field.closeTime,
      location: field.location,
      capacity: field.capacity
    });
  };

  const handleSave = () => {
    const fieldData = {
      ...formData,
      isActive: true,
      rating: 0,
      totalBookings: 0
    };

    if (editingField) {
      onUpdateField({ ...editingField, ...fieldData });
      setEditingField(null);
    } else {
      onAddField(fieldData);
      setShowAddForm(false);
    }
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingField(null);
    setViewingField(null);
  };

  const toggleAmenity = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  if (showAddForm || editingField) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingField ? 'Chỉnh Sửa Sân' : 'Thêm Sân Mới'}
              </h2>
              <button
                onClick={handleCancel}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên Sân
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nhập tên sân"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loại Thể Thao
                </label>
                <select
                  value={formData.sport}
                  onChange={(e) => setFormData(prev => ({ ...prev, sport: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Chọn loại thể thao</option>
                  {sportTypes.map(sport => (
                    <option key={sport} value={sport}>{sport}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mô Tả
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Mô tả chi tiết về sân"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giá Thường (VNĐ/giờ)
                </label>
                <input
                  type="number"
                  value={formData.hourlyRate}
                  onChange={(e) => setFormData(prev => ({ ...prev, hourlyRate: Number(e.target.value) }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giá Cao Điểm (VNĐ/giờ)
                </label>
                <input
                  type="number"
                  value={formData.peakRate}
                  onChange={(e) => setFormData(prev => ({ ...prev, peakRate: Number(e.target.value) }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sức Chứa
                </label>
                <input
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData(prev => ({ ...prev, capacity: Number(e.target.value) }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giờ Mở Cửa
                </label>
                <input
                  type="time"
                  value={formData.openTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, openTime: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giờ Đóng Cửa
                </label>
                <input
                  type="time"
                  value={formData.closeTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, closeTime: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Địa Chỉ
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Địa chỉ sân"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Tiện Ích
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {availableAmenities.map(amenity => (
                  <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.amenities.includes(amenity)}
                      onChange={() => toggleAmenity(amenity)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                onClick={handleCancel}
                className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Lưu</span>
              </button>
            </div>
          </div>
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
          onClick={handleAddField}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
        >
          <Plus className="w-5 h-5" />
          <span>Thêm Sân Mới</span>
        </button>
      </div>

      {/* Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fields.map((field) => (
          <div key={field.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-video bg-gray-200 relative overflow-hidden">
              {field.images[0] ? (
                <img 
                  src={field.images[0]} 
                  alt={field.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Camera className="w-12 h-12 text-gray-400" />
                </div>
              )}
              <div className="absolute top-4 right-4">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  field.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {field.isActive ? 'Hoạt động' : 'Tạm dừng'}
                </span>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900 truncate">{field.name}</h3>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">{field.rating}</span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span className="truncate">{field.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{field.openTime} - {field.closeTime}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <DollarSign className="w-4 h-4" />
                  <span>{formatCurrency(field.hourlyRate)}/giờ</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{field.capacity} người</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => setViewingField(field)}
                  className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  <span className="text-sm">Xem</span>
                </button>
                <button
                  onClick={() => handleEditField(field)}
                  className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 text-blue-700 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  <span className="text-sm">Sửa</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View Field Modal */}
      {viewingField && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">{viewingField.name}</h2>
                <button
                  onClick={() => setViewingField(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {viewingField.images[0] && (
                <img 
                  src={viewingField.images[0]} 
                  alt={viewingField.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Thông Tin Cơ Bản</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-gray-600">Loại:</span> {viewingField.sport}</p>
                    <p><span className="text-gray-600">Sức chứa:</span> {viewingField.capacity} người</p>
                    <p><span className="text-gray-600">Đánh giá:</span> {viewingField.rating}/5</p>
                    <p><span className="text-gray-600">Tổng đặt:</span> {viewingField.totalBookings}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Giờ & Giá</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-gray-600">Giờ mở:</span> {viewingField.openTime} - {viewingField.closeTime}</p>
                    <p><span className="text-gray-600">Giá thường:</span> {formatCurrency(viewingField.hourlyRate)}</p>
                    <p><span className="text-gray-600">Giá cao điểm:</span> {formatCurrency(viewingField.peakRate)}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Mô Tả</h4>
                <p className="text-gray-600 text-sm">{viewingField.description}</p>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Tiện Ích</h4>
                <div className="flex flex-wrap gap-2">
                  {viewingField.amenities.map(amenity => (
                    <span key={amenity} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FieldManagement;