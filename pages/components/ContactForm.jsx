import React, { useState } from 'react';
import axios from 'axios';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'

const ContactForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            await axios.post('/api/sendEmail', { name, email, message });
            setIsSuccess(true);
        } catch (error) {
            setError('Error al enviar el correo electrónico');
        }

        setIsLoading(false);
    };

    return (

        <>
            <form onSubmit={handleSubmit}>

                <div className="space-y-12">

                    <div className="pb-3">

                        <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-full">
                            <div className="mt-2">
                                <textarea
                                    id="about"
                                    name="about"
                                    rows={3}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue={''}
                                    placeholder="Mensaje" value={message} onChange={(e) => setMessage(e.target.value)}
                                />
                            </div>
                        </div>

                    </div>
                </div>

                {isLoading ? (
                    <p>Enviando correo electrónico...</p>
                ) : (
                    <button className="btn btn-success btn-sm" type="submit">Enviar correo electrónico</button>
                )}
                {isSuccess && <p>Correo electrónico enviado exitosamente</p>}
                {error && <p>{error}</p>}
            </form>

        </>



    );
};

export default ContactForm;
