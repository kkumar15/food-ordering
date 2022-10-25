import Head from 'next/head'
import { ShowMealsComponent } from "../components/ShowMealsComponent"

export default function Home() {
  return (
    <div className="container mx-auto ">
      <Head>
        <title>Order Food</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='w-full h-full'>
        <h1 className="title">
          Welcome to your menu!
        </h1>

        <p className="description">
          Choose from below meals of this resturant
        </p>
        <div className='max-w-[100%] w-full h-full mx-auto'>
          <div className="grid grid-cols-3 gap-4" style={{
            display: 'grid !important'
          }}>
            <ShowMealsComponent></ShowMealsComponent>
          </div>
        </div>

      </main>
    </div>
  )
}
