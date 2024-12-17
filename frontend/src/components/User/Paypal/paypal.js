import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import { useEffect } from "react";

// This value is from the props in the UI
const style = { "layout": "horizontal" };

// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({ currency, showSpinner, amount, handleOrderSubmit }) => {
    const [{ isPending, options }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
        dispatch({
            type: 'resetOptions',
            value: {
                ...options, currency: currency
            }
        })
    }, [currency, showSpinner])

    return (
        <>
            {(showSpinner && isPending) && <div className="spinner" />}
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[currency, amount]}
                fundingSource={undefined}
                createOrder={(data, actions) => actions.order.create({
                    purchase_units: [
                        { amount: { currency_code: currency, value: amount } }
                    ]
                }).then(orderID => orderID)}
                onApprove={(data, actions) => actions.order.capture().then(async (response) => {
                    console.log(response);
                    if (response.status === "COMPLETED") {
                        handleOrderSubmit(1)
                    }
                })}
            />
        </>
    );
}

export default function Paypal({ amount, handleOrderSubmit }) {
    return (
        <div className="w-full">
            <PayPalScriptProvider options={{ clientId: "test", components: "buttons", currency: "USD" }}>
                <ButtonWrapper currency={'USD'} amount={amount} showSpinner={false} handleOrderSubmit={handleOrderSubmit} />
            </PayPalScriptProvider>
        </div>
    );
}