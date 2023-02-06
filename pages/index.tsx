import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { useQuery } from 'react-query';
import { CountryService, ICountry } from '../app/services/country.service';
import { useEffect, useState } from 'react';
import { useCountries } from '../hooks/useCountries';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  // const [countries, setCountries] = useState<ICountry[]>([])
  const { isLoading, countries, refetch } = useCountries()
  
  // const {isLoading, data: response} = useQuery('country list', () => CountryService.getAll())
  // const {isLoading} = useQuery('country list', () => CountryService.getAll(), {
  //   onSuccess: ({data}) => {
  //     setCountries(data)
  //   },
  //   onError: (error: any) => {
  //     alert(error.message)
  //   },
  //   // select: ({data}): ICountry[] => data?.map(country => ({
  //   //   ...country,
  //   //   title: country.title + "!"
  //   // }))
  // })

  useEffect(() => {
    console.log(countries);
    
  }, [countries])

  return (
    <>
      <main className={styles.main}>
        <h1>React Query</h1>

        {
          isLoading ? (
            <div>Loading...</div> 
            ):
            countries?.data.length ? (
              <div className={styles.grid}>
                {countries?.data.map(country => (
                  <div
                    key={country.id}
                    className={styles.card}
                  >
                    <h2 className={inter.className}>
                      {country.title} <span>-&gt;</span>
                    </h2>
                    <p className={inter.className}>
                      {country.population}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div>Country not found</div>
            )
        }
        <button onClick={() => refetch()}>Fetch data</button>
      </main>
    </>
  )
}
