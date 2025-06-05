
import type { StepProps } from './MultiStepForm.types';

export const PersonalStep = ({ data, onChange, errors }:StepProps) =>{ 
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium mb-1">First Name *</label>
                <input
                type="text"
                value={data.firstName || ''}
                onChange={(e) => onChange({ firstName: e.target.value })}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter first name"
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Last Name *</label>
                <input
                type="text"
                value={data.lastName || ''}
                onChange={(e) => onChange({ lastName: e.target.value })}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter last name"
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
            </div>
            </div>
            <div>
            <label className="block text-sm font-medium mb-1">Email *</label>
            <input
                type="email"
                value={data.email || ''}
                onChange={(e) => onChange({ email: e.target.value })}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter email address"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
        </div>
    )
}