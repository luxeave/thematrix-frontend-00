import Head from 'next/head'
import { getSession, useSession, signOut } from 'next-auth/react'
import { Guest } from '@/src/components/home/guest'
import { User } from '@/src/components/home/user'

export default function Home() {

  const { data: session } = useSession()

  function handleSignOut(){
    signOut()
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <Head>
        <title>Home Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {session ? User({session, handleSignOut}) : Guest()}
    </div>
  )
}

export async function getServerSideProps({req}) {
  const session = await getSession({ req })

  if(!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: { session }
  }
}