"use client"
import { FormEvent, Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import { addUserEmailtoProduct } from '@/lib/actions'

interface Props{
    productId:string,
}
const Modal = ({productId}:Props) => {
    let [isOpen, setIsOpen] = useState(true)
    const openModal = ()=> setIsOpen(true);

    const closeModal = ()=> setIsOpen(false);

    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const handleSubmit = async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setIsLoading(true);
        // await add user email to product(product id , emial)

    await addUserEmailtoProduct(productId,email);



        setIsLoading(false)
        setEmail('');
        closeModal()

    }



    return (  
        <>

        <button className="btn" type="button" onClick={openModal}>
            Track
        </button>

        <Transition appear show={isOpen} as={Fragment}>
        <Dialog as = "div"  onClose={closeModal}
         className="dialog-container">

            <div className='min-h-screen px-4 text-center'>
                <Transition.Child as = {Fragment}
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
                >
                <Dialog.Overlay className="fixed inset-0"/>
                </Transition.Child>
            <span
            className='inline-block h-screen align-middle'
            aria-hidden="true"
            >
            </span>
            <Transition.Child as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
            >
                <div className='dialog-content'>
                    <div className='flex flex-col'>
                        <div className='flex justify-between'>
                            <div className='p-3 border border-gray-200 rounded-10'>
                                <Image
                                src="/assets/icons/logo.svg"
                                alt='logo'
                                width={28}
                                height={28}
                                ></Image>

                            </div>
                            <Image src="/assets/icons/x-close.svg" 
                            alt='close'
                            width={24}
                            height={24}
                            className='cursor-pointer'
                            onClick={closeModal}
                            ></Image>
                        </div>
                        <h4
                        className='dialog-head_text'
                        >Stay Updated with Pricing Alerts

                            On your Inbox
                        </h4>

                        <p className='text-sm text-gray-600 mt-2'>
                            Never Miss Such Exciting Offers
                        </p>
                    </div>

                    <form className='flex flex-col mt-5'
                    onSubmit={handleSubmit}
                    >
                        <label htmlFor='email' className='
                        font-medium text-gray-700 text-sm
                        '>
                            Email Address
                        </label>

                        <div className='dialog-input_container'>
                            <Image
                            src="/assets/icons/mail.svg" 
                            alt='mail'
                            width={18}
                            height={18}
                            className='cursor-pointer'
                            
                            ></Image>

                            <input 
                            required
                            type='email'
                            id='email'
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            placeholder='<EMAIL>'
                            className='dialog-input'
                            ></input>
                        </div>

                        <button type='submit' className='dialog-btn'>
                            {
                                isLoading ? 'Submitting':'Track'
                            }
                        </button>
                    </form>
                </div>
            </Transition.Child>
            </div>
     
    </Dialog>


        </Transition>

      

        </>
    );
}
 
export default Modal;