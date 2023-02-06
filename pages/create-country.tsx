import { NextPage } from "next"
import { useMutation } from "react-query"
import { ICountry, CountryService } from '../app/services/country.service';
import { useRouter } from 'next/router';
import React, { FormEventHandler, useState } from "react";

const CreateCountry: NextPage = () => {
    const [data, setData] = useState<ICountry>({
        id: 1,
        title: "",
        population: "",
        img: ""
    } as ICountry)
    const router = useRouter()

    const {isLoading, mutateAsync} = useMutation('create country', (data: ICountry) => CountryService.create(data), {
        onSuccess: () => {
            router.push('/')
        },
        onError: (error: any) => {
            alert(error.message)
        }
    })
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await mutateAsync(data)
    }

    return(
        <div>
            <form 
                onSubmit={handleSubmit}
                onKeyDown={e => {
                    if(e.keyCode === 13) {
                        handleSubmit(e)
                    }
                }}
            >
                <input 
                    placeholder="id"
                    value={data.id}
                    onChange={e => setData({...data, id: +e.target.value})}
                />
                <input
                    placeholder="Name"
                    value={data.title}
                    onChange={e => setData({...data, title: e.target.value})}
                />
                <input
                    placeholder="population"
                    value={data.population}
                    onChange={e => setData({...data, population: e.target.value})}
                />
                <input
                    placeholder="img"
                    value={data.img}
                    onChange={e => setData({...data, img: e.target.value})}
                />
                <button type="submit" disabled={isLoading}>Submit</button>
            </form>
        </div>
    )
}
export default CreateCountry