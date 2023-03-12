import React from 'react'
import SomethingWentWrong from './SomethingWentWrong';

class AppErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      // You can also log the error to an error reporting service
    //   logErrorToMyService(error, errorInfo);
        console.log('error encountered: ')
        console.error(error)
        console.error(errorInfo)
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <SomethingWentWrong />
      }
  
      return this.props.children; 
    }
  }

  export default AppErrorBoundary