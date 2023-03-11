import { HashLoader } from 'react-spinners'
import Loading from './AwaitingConnection'

export const NoAccount = () => (
    <Loading loadingIcon={<HashLoader color="#B0F122" />} loadingText="Please connect to Metamask" />
)