import '../styles/globals.css'
import Layout from '@/components/Layout'
import Provider from '@/components/Provider'


export const metadata = {
  title: "WillowCare",
  description: "Your all-in-one software for elderly care management!"
}

const RootLayout = ({children}) => {
  return (
    <html lang='en'>
      <body>
      <Provider>
        <main className='app"bg-gray-100"'>
        <Layout children = {children}/>
        </main>
        </Provider>
      </body>
  </html>
  )
}

export default RootLayout
