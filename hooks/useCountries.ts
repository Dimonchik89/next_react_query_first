import { useQuery } from 'react-query';
import { CountryService } from '../app/services/country.service';


export const useCountries = () => {
    const {isLoading, data: countries, refetch} = useQuery('country list', () => CountryService.getAll(), {
    onError: (error: any) => {
      alert(error.message)
    },
    enabled: false
  })

  return { isLoading, countries, refetch}
}