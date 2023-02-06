import { useRouter } from 'next/router';
import { useCountry } from '../../hooks/useCountry';

const Country = () => {
    const {query} = useRouter()
    const {isLoading, country} = useCountry(String(query?.id))

    return (
        <>
            <h1>{country?.title}</h1>
            <h3>{country?.population}</h3>
        </>
    )
}
export default Country