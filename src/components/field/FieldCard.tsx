'use client';

import React from 'react';
import Image from 'next/image';
import { Field } from '../../types';
import {
  Edit,
  Eye,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Star,
} from 'lucide-react';

interface FieldCardProps {
  field: Field;
  onView: () => void;
  onEdit: () => void;
  formatCurrency: (amount: number) => string;
}

const FieldCard: React.FC<FieldCardProps> = ({
  field,
  onView,
  onEdit,
  formatCurrency,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-video bg-gray-200 relative overflow-hidden">
        {field.images[0] ? (
          <Image
            src={field.images[0]}
            alt={field.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
          </div>
        )}
        <div className="absolute top-4 right-4">
          <span
            className={`px-2 py-1 text-xs rounded-full ${
              field.isActive
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
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
            <span>
              {field.openTime} - {field.closeTime}
            </span>
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
            onClick={onView}
            className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span className="text-sm">Xem</span>
          </button>
          <button
            onClick={onEdit}
            className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 text-blue-700 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
          >
            <Edit className="w-4 h-4" />
            <span className="text-sm">Sửa</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FieldCard;
