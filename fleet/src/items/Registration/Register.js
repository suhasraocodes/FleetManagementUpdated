import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'; // Adjust the path here

function Register() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

 const onSubmit = async (data) => {
    const formData = new FormData();
    
    // Append text fields to FormData
    formData.append('name', data.name);
    formData.append('location', data.location);
    formData.append('driver', data.driver);
    formData.append('specifications', data.specifications);
    formData.append('maintenance', data.maintenance);
    formData.append('capacity', data.capacity);
    formData.append('fuelType', data.fuelType);
    formData.append('status', data.status);
    formData.append('licensePlate', data.licensePlate);
    formData.append('year', data.year);
    formData.append('model', data.model);
    
    // Append nested coordinates
    formData.append('coordinates.lat', data.coordinates.lat);
    formData.append('coordinates.lng', data.coordinates.lng);
    
    // Append files to FormData
    if (data.image[0]) {
        formData.append('image', data.image[0]);
    }
    if (data.driverImage[0]) {
        formData.append('driverImage', data.driverImage[0]);
    }

    try {
        const response = await axios.post('http://localhost:8000/trucks/reg', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        reset(); // Reset the form after successful submission
        alert('Truck registered successfully!');
    } catch (error) {
        console.error('Error registering truck:', error);
        alert('Failed to register truck.');
    }
};


  return (
    <div className="flex justify-center items-center p-20">
      <Card className="w-full max-w-3xl bg-white shadow-lg rounded-lg">
        <CardHeader className="p-6">
          <CardTitle className="text-3xl font-bold">Register Truck</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-4">
            <div className="flex flex-col">
              <label className="font-semibold">Truck Name</label>
              <input type="text" {...register('name', { required: 'Truck name is required' })} className="border p-2 rounded" />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">Location</label>
              <input type="text" {...register('location', { required: 'Location is required' })} className="border p-2 rounded" />
              {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">Driver Name</label>
              <input type="text" {...register('driver', { required: 'Driver name is required' })} className="border p-2 rounded" />
              {errors.driver && <p className="text-red-500 text-sm">{errors.driver.message}</p>}
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">Driver Image</label>
              <input type="file" {...register('driverImage')} className="border p-2 rounded" />
              {errors.driverImage && <p className="text-red-500 text-sm">{errors.driverImage.message}</p>}
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">Specifications</label>
              <input type="text" {...register('specifications', { required: 'Specifications are required' })} className="border p-2 rounded" />
              {errors.specifications && <p className="text-red-500 text-sm">{errors.specifications.message}</p>}
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">Maintenance Date</label>
              <input type="date" {...register('maintenance', { required: 'Maintenance date is required' })} className="border p-2 rounded" />
              {errors.maintenance && <p className="text-red-500 text-sm">{errors.maintenance.message}</p>}
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">Capacity</label>
              <input type="number" {...register('capacity', { required: 'Capacity is required' })} className="border p-2 rounded" />
              {errors.capacity && <p className="text-red-500 text-sm">{errors.capacity.message}</p>}
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">Fuel Type</label>
              <input type="text" {...register('fuelType', { required: 'Fuel type is required' })} className="border p-2 rounded" />
              {errors.fuelType && <p className="text-red-500 text-sm">{errors.fuelType.message}</p>}
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">Status</label>
              <select {...register('status', { required: 'Status is required' })} className="border p-2 rounded">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">Truck Image</label>
              <input type="file" {...register('image')} className="border p-2 rounded" />
              {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">Latitude</label>
              <input type="number" step="any" {...register('coordinates.lat', { required: 'Latitude is required' })} className="border p-2 rounded" />
              {errors.coordinates?.lat && <p className="text-red-500 text-sm">{errors.coordinates.lat.message}</p>}
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">Longitude</label>
              <input type="number" step="any" {...register('coordinates.lng', { required: 'Longitude is required' })} className="border p-2 rounded" />
              {errors.coordinates?.lng && <p className="text-red-500 text-sm">{errors.coordinates.lng.message}</p>}
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">License Plate</label>
              <input type="text" {...register('licensePlate', { required: 'License plate is required' })} className="border p-2 rounded" />
              {errors.licensePlate && <p className="text-red-500 text-sm">{errors.licensePlate.message}</p>}
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">Year</label>
              <input type="number" {...register('year', { required: 'Year is required' })} className="border p-2 rounded" />
              {errors.year && <p className="text-red-500 text-sm">{errors.year.message}</p>}
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">Model</label>
              <input type="text" {...register('model', { required: 'Model is required' })} className="border p-2 rounded" />
              {errors.model && <p className="text-red-500 text-sm">{errors.model.message}</p>}
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 rounded mt-4 hover:bg-blue-700">
              Register Truck
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Register;
