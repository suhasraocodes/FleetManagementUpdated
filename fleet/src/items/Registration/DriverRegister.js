import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

function DriverRegister() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    
    // Append form fields to FormData
    formData.append('name', data.name);
    formData.append('contactInfo', data.contactInfo);
    formData.append('licenseNumber', data.licenseNumber);

    // Append driver image
    if (data.driverImage[0]) {
        formData.append('driverImage', data.driverImage[0]);
    }

    try {
      const response = await axios.post('http://localhost:8000/drivers/reg', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      reset(); // Reset the form after successful submission
      alert('Driver registered successfully!');
    } catch (error) {
      console.error('Error registering driver:', error);
      alert('Failed to register driver.');
    }
  };

  return (
    <div className="flex justify-center items-center p-20">
      <Card className="w-full max-w-3xl bg-white shadow-lg rounded-lg">
        <CardHeader className="p-6">
          <CardTitle className="text-3xl font-bold">Register Driver</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-4">
            <div className="flex flex-col">
              <label className="font-semibold">Driver Name</label>
              <input 
                type="text" 
                {...register('name', { required: 'Driver name is required' })} 
                className="border p-2 rounded" 
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            <div className="flex flex-col">
              <label className="font-semibold">Contact Info</label>
              <input 
                type="text" 
                {...register('contactInfo', { required: 'Contact info is required' })} 
                className="border p-2 rounded" 
              />
              {errors.contactInfo && <p className="text-red-500 text-sm">{errors.contactInfo.message}</p>}
            </div>

            <div className="flex flex-col">
              <label className="font-semibold">License Number</label>
              <input 
                type="text" 
                {...register('licenseNumber', { required: 'License number is required' })} 
                className="border p-2 rounded" 
              />
              {errors.licenseNumber && <p className="text-red-500 text-sm">{errors.licenseNumber.message}</p>}
            </div>

            <div className="flex flex-col">
              <label className="font-semibold">Driver Image</label>
              <input 
                type="file" 
                {...register('driverImage', { required: 'Driver image is required' })} 
                className="border p-2 rounded" 
              />
              {errors.driverImage && <p className="text-red-500 text-sm">{errors.driverImage.message}</p>}
            </div>

            <button 
              type="submit" 
              className="w-full bg-blue-500 text-white font-bold py-2 rounded mt-4 hover:bg-blue-700">
              Register Driver
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default DriverRegister;
