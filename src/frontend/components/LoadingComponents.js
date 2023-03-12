import { HashLoader } from 'react-spinners'
import Loading from './AwaitingConnection'

export const NoAccount = () => (
    <Loading loadingIcon={<HashLoader color="#B0F122" />} loadingText="Please connect your Wallet" />
)

export const FetchingProfile = () => (
    <Loading loadingIcon={<LoaderAnim color='#B0F122' />} loadingText="Fetching profile data" />
)