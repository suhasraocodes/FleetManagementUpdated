import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { toast } from 'sonner';

function Register() {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const [drivers, setDrivers] = useState([]);
  const [driverImagePath, setDriverImagePath] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

  useEffect(() => {
    // Fetch drivers from the backend
    axios.get('http://localhost:8000/drivers')
      .then(response => {
        setDrivers(response.data);
      })
      .catch(error => {
        toast.error('Error fetching drivers');
        console.error('Error fetching drivers:', error);
      });

    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          toast.error('Error getting location');
          console.error('Error getting location:', error);
        }
      );
    } else {
      toast.error('Geolocation is not supported by this browser.');
    }
  }, []);

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

    // Append coordinates from the state
    formData.append('coordinates.lat', coordinates.lat);
    formData.append('coordinates.lng', coordinates.lng);

    // Append files to FormData
    if (data.image[0]) {
      formData.append('image', data.image[0]);
    }

    // Append driver image path as a string
    if (driverImagePath) {
      formData.append('driverImagePath', driverImagePath);
    }

    try {
      const response = await axios.post('http://localhost:8000/trucks/reg', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      reset(); // Reset the form after successful submission
      toast.success('Truck registered successfully!');
    } catch (error) {
      toast.error('Failed to register truck.');
      console.error('Error registering truck:', error);
    }
  };

  // Handle driver selection
  const handleDriverChange = (e) => {
    const selectedDriver = drivers.find(driver => driver.name === e.target.value);
    if (selectedDriver) {
      setDriverImagePath(selectedDriver.driverImage); // Set the driver's image path
    } else {
      setDriverImagePath(''); // Clear the image path if no driver is selected
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
            {/* Truck Name */}
            <div className="flex flex-col">
              <label className="font-semibold">Truck Name</label>
              <input type="text" {...register('name', { required: 'Truck name is required' })} className="border p-2 rounded" />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            {/* Location */}
            <div className="flex flex-col">
              <label className="font-semibold">Location</label>
              <input type="text" {...register('location', { required: 'Location is required' })} className="border p-2 rounded" />
              {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
            </div>

            {/* Driver Name */}
            <div className="flex flex-col">
              <label className="font-semibold">Driver Name</label>
              <select
                {...register('driver', { required: 'Driver name is required' })}
                className="border p-2 rounded"
                onChange={handleDriverChange}
              >
                <option value="">Select Driver</option>
                {drivers.map(driver => (
                  <option key={driver._id} value={driver.name}>{driver.name}</option>
                ))}
              </select>
              {errors.driver && <p className="text-red-500 text-sm">{errors.driver.message}</p>}
            </div>

            {/* Driver Image */}
            {driverImagePath && (
              <div className="flex flex-col">
                <label className="font-semibold">Driver Image</label>
                <img src={`http://localhost:8000/${driverImagePath}`} alt="Driver" className="border p-2 rounded" />
              </div>
            )}

            {/* Specifications */}
            <div className="flex flex-col">
              <label className="font-semibold">Specifications</label>
              <input type="text" {...register('specifications', { required: 'Specifications are required' })} className="border p-2 rounded" />
              {errors.specifications && <p className="text-red-500 text-sm">{errors.specifications.message}</p>}
            </div>

            {/* Maintenance Date */}
            <div className="flex flex-col">
              <label className="font-semibold">Maintenance Date</label>
              <input type="date" {...register('maintenance', { required: 'Maintenance date is required' })} className="border p-2 rounded" />
              {errors.maintenance && <p className="text-red-500 text-sm">{errors.maintenance.message}</p>}
            </div>

            {/* Capacity */}
            <div className="flex flex-col">
              <label className="font-semibold">Capacity</label>
              <input type="number" {...register('capacity', { required: 'Capacity is required' })} className="border p-2 rounded" />
              {errors.capacity && <p className="text-red-500 text-sm">{errors.capacity.message}</p>}
            </div>

            {/* Fuel Type */}
            <div className="flex flex-col">
              <label className="font-semibold">Fuel Type</label>
              <input type="text" {...register('fuelType', { required: 'Fuel type is required' })} className="border p-2 rounded" />
              {errors.fuelType && <p className="text-red-500 text-sm">{errors.fuelType.message}</p>}
            </div>

            {/* Status */}
            <div className="flex flex-col">
              <label className="font-semibold">Status</label>
              <select {...register('status', { required: 'Status is required' })} className="border p-2 rounded">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
            </div>

            {/* Truck Image */}
            <div className="flex flex-col">
              <label className="font-semibold">Truck Image</label>
              <input type="file" {...register('image')} className="border p-2 rounded" />
              {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
            </div>

            {/* Latitude and Longitude */}
            {coordinates.lat !== null && coordinates.lng !== null ? (
              <div className="flex flex-col">
                <label className="font-semibold">Coordinates</label>
                <input type="text" value={`Latitude: ${coordinates.lat}, Longitude: ${coordinates.lng}`} readOnly className="border p-2 rounded bg-gray-100" />
              </div>
            ) : (
              <div className="flex flex-col">
                <label className="font-semibold">Coordinates</label>
                <input type="text" value="Fetching location..." readOnly className="border p-2 rounded bg-gray-100" />
              </div>
            )}

            {/* License Plate */}
            <div className="flex flex-col">
              <label className="font-semibold">License Plate</label>
              <input type="text" {...register('licensePlate', { required: 'License plate is required' })} className="border p-2 rounded" />
              {errors.licensePlate && <p className="text-red-500 text-sm">{errors.licensePlate.message}</p>}
            </div>

            {/* Year */}
            <div className="flex flex-col">
              <label className="font-semibold">Year</label>
              <input type="number" {...register('year', { required: 'Year is required' })} className="border p-2 rounded" />
              {errors.year && <p className="text-red-500 text-sm">{errors.year.message}</p>}
            </div>

            {/* Model */}
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
