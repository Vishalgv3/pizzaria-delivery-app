// importing google font for NextJS
import CustomerOrders from '@/components/CustomerOrders';
import LoadingOverlay from '@/components/LoadingOverlay';
import { getJSONData } from '@/tools/Toolkit';
import { Order, Orders } from '@/tools/orders.model';
import { data } from 'autoprefixer';
import { Griffy } from 'next/font/google';
import { useEffect, useState } from 'react';
const griffy = Griffy({weight: "400", subsets: ['latin']});

export default function Home() {
  // retrieve server sided script
  const RETRIEVE_SCRIPT:string = "https://www.seanmorrow.ca/_lessons/retrieveOrder.php";

  // -------------------------- event handlers
  const onResponse = (data:Orders) => {
    console.log(data);
    setRetrievedData(data.orders);
  };

  const onError = (message:string) => {
    console.log(`*** Error retrieving pizza order data:  ${message}`);
  };

  const getOrders = (e:any) => {
    setShowLoadingOverlay(true);
    // fetch the data from the api
    getJSONData(RETRIEVE_SCRIPT, onResponse, onError);
  };

  // --------------------------- state variables
  const [showLoadingOverlay, setShowLoadingOverlay] = useState<boolean>(true);
  const [retrievedData, setRetrievedData] = useState<Order[]>([]);

  // --------------------------- use effect
  useEffect(() => {
    setShowLoadingOverlay(false);
  }, [retrievedData])
  

  // ---------------------------- rendering to DOM
  return (
    <main className="grid grid-rows-1 grid-cols-1 gap-0 text-content">

    <LoadingOverlay enabled={showLoadingOverlay} bgColor="#b82308" showSpinner={true} spinnerColor="FFFFFF" />

      <div className="flex flex-nowrap items-center justify-center 
          bg-accent bg-[url('./../lib/images/background.jpg')] bg-no-repeat bg-center bg-cover
          border-solid border-b-4 border-accent min-h-[220px] p-5 text-white">

        <header className="grow text-center md:text-left">
          <div className={`${griffy.className} text-6xl`}>Antonio's Online Pizzaria</div>
          <div className="text-sm">If it's not Antonio's, it's rubbish!</div>
        </header>

        <div className="shrink-0 hidden md:block">
          <i className="fab fa-facebook-square fa-2x ml-1"></i>
          <i className="fab fa-twitter-square fa-2x ml-1"></i>
          <i className="fab fa-instagram fa-2x ml-1"></i>
        </div>
      </div>

      <aside className="flex flex-nowrap items-center justify-between p-5 flex-col md:flex-row">
        <div className="mb-5 md:hidden text-center">
          <>1234 Cheesy Drive | Tastyville, NS | 902-123-4567</>
        </div>
        <div>
          <div className="text-accent text-3xl font-bold mb-2.5">Welcome loyal pizza dispatcher....</div>Click the &quot;Get Orders&quot; button below to view all current orders that need to be delivered.
          <div>
              <button 
                className="bg-accent border-none rounded-md p-2.5 text-white hover:bg-greyContent mt-5"
                onClick={getOrders}>Get Orders</button>
          </div>
        </div>
        <div className="shrink-0 text-lg text-right text-greyContent hidden md:block">
          <div>Antonio's Pizzaria</div>
          <div>1234 Cheesy Drive</div>
          <div>Tastyville, NS</div>
          <div>902-123-4567</div>
        </div>
      </aside>

      <div className="bg-greyAccent p-10">

        {retrievedData.length == 0 ? <div>No orders to display...</div> :
          <div id="output" className="divide-dashed divide-y-2 divide-accent">
            {retrievedData.map((data) => 
            <CustomerOrders
            id={data.id}
            name={data.name}
            address={data.address}
            city={data.city}
            size={data.size}
            delivered={data.delivered}
            toppings={data.toppings}
            notes={data.notes} />)}
          </div>
        }


      </div>
    </main>
  );
}