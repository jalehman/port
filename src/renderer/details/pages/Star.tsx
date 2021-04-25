import React from 'react'
import { Controller } from 'react-hook-form'
import { send } from '../../client/ipc'
import { DetailsContainer } from '../components/DetailsContainer'
import { NameField } from '../components/NameField'
import { ShipNameField } from '../components/ShipNameField'
import { useAddPier } from '../useAddPier'

export const Star: React.FC = () => {
    const {
        form,
        mutate
    } = useAddPier(data => send('add-pier', { ...data, type: 'star' }));
    const { isValid } = form.formState;

    async function setFile() {
        return await send('get-file')
    }

    return (
        <DetailsContainer
            title="Boot a Star"
            buttonDisabled={!isValid}
            onSubmit={form.handleSubmit(data => mutate(data))}
        >
            <h1 className="font-semibold text-base mb-6">Enter Ship Details</h1>
            <div>
                <label htmlFor="name">Name <span className="text-gray-700">(local only)</span></label>
                <NameField form={form} />
            </div>
            <div>
                <label htmlFor="shipname">Shipname <span className="text-gray-700">(Urbit ID)</span></label>
                <ShipNameField form={form} />
            </div>
            <div>
                <label htmlFor="directory">Key File</label>
                <div className="flex items-stretch mt-2">
                    <Controller
                        name="keyFile"
                        control={form.control}
                        defaultValue=""
                        rules={{ required: true }}
                        render={({ value, onChange, name }) => (
                            <>
                                <input 
                                    id="directory" 
                                    name={name} 
                                    type="text"
                                    value={value}
                                    className="flex-1 px-2 py-1 bg-transparent border border-r-0 border-gray-700 focus:outline-none focus:border-gray-500 transition-colors rounded rounded-r-none" 
                                    placeholder="/Users/my-user/sampel-palnet.key"
                                    readOnly={true}
                                    onClick={async () => onChange(await setFile())} 
                                />
                                <button type="button" className="flex-none flex justify-center items-center px-2 py-1 bg-transparent border border-gray-700 hover:border-white focus:outline-none focus:border-white focus:ring focus:ring-gray-600 focus:ring-opacity-50 transition-colors rounded rounded-l-none" onClick={async () => onChange(await setFile())}>
                                    Choose Key File
                                </button>
                            </>
                        )}
                    />
                </div>
            </div>
        </DetailsContainer>
    )
}