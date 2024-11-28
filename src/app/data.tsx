'use server'
import db from "./modules/db";

export default async function Data() {
   let receipts = null;

  try {
   // receipts = await db.receipt.findMany();
  } catch (error) {
    console.error('Error fetching receipts:', error);
    receipts = null;
  }

  return (
    <div className="output-area">
      {receipts ? (
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
        <p>No receipts found.</p>
      )}
    </div>
  );
}
