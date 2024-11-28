'use server'
import db from "./modules/db";
import { GetServerSideProps } from "next";
  
export const getServerSideProps = async () => {
    // Fetch data from Prisma
    const receipts = await db.receipt.findMany({ orderBy: { vendor: 'desc' } });
    
    // Pass the data to the component as props
    return {
      props: {
        receipts,
      },
    };
  }  

 const Data: any({ receipts }) {
    return (
      <div className="output-area">
        {receipts.length > 0 ? (
          <pre>
            <p>Stored Receipts:</p>
            <br />
            {receipts.map((receipt) => (
              <div key={receipt.id}>
                <strong>Vendor:</strong> {receipt.vendor}
                <br />
                {receipt.content}
                <br />
              </div>
            ))}
          </pre>
        ) : (
          <p></p>
        )}
      </div>
    );
  }