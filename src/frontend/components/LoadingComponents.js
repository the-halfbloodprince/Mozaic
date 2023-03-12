import { HashLoader } from 'react-spinners'
import Loading from './AwaitingConnection'
import { PuffLoader } from 'react-spinners'

export const NoAccount = () => (
    <Loading loadingIcon={<HashLoader color="#B0F122" />} loadingText="Please connect your Wallet" />
)

export const FetchingProfile = () => (
    <Loading loadingIcon={<PuffLoader color='#B0F122' />} loadingText="Fetching profile data" />
)