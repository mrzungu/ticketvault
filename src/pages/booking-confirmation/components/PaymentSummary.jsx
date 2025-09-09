import React from 'react';
import Icon from '../../../components/AppIcon';

const PaymentSummary = ({ paymentData, bookingData }) => {
  return (
    <div className="bg-card border-2 border-border rounded-lg shadow-elevation-2 p-6 mb-6">
      <h2 className="text-xl font-semibold text-foreground font-mono mb-4 flex items-center">
        <Icon name="CreditCard" size={24} className="text-accent mr-2" />
        Payment Summary
      </h2>
      <div className="space-y-4">
        {/* Transaction Details */}
        <div className="bg-muted/30 border border-border rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Transaction ID</p>
              <p className="font-mono font-bold text-foreground">{paymentData?.transactionId}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Payment Method</p>
              <div className="flex items-center space-x-2">
                <Icon name="CreditCard" size={16} className="text-accent" />
                <span className="font-medium text-foreground">
                  {paymentData?.method} •••• {paymentData?.lastFour}
                </span>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Payment Date</p>
              <p className="font-medium text-foreground">{paymentData?.date}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="font-medium text-success">Completed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Billing Breakdown */}
        <div className="space-y-3">
          <h3 className="font-medium text-foreground">Billing Breakdown</h3>
          
          {bookingData?.tickets?.map((ticket, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b border-border last:border-b-0">
              <div>
                <p className="font-medium text-foreground">{ticket?.type} Ticket</p>
                <p className="text-sm text-muted-foreground">
                  {ticket?.quantity} × ${ticket?.price}
                </p>
              </div>
              <p className="font-bold text-foreground">
                ${(ticket?.quantity * ticket?.price)?.toFixed(2)}
              </p>
            </div>
          ))}

          <div className="flex justify-between items-center py-2 border-b border-border">
            <p className="text-muted-foreground">Subtotal</p>
            <p className="font-medium text-foreground">${bookingData?.subtotal}</p>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-border">
            <p className="text-muted-foreground">Service Fee</p>
            <p className="font-medium text-foreground">${bookingData?.serviceFee}</p>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-border">
            <p className="text-muted-foreground">Processing Fee</p>
            <p className="font-medium text-foreground">${bookingData?.processingFee}</p>
          </div>

          {bookingData?.discount > 0 && (
            <div className="flex justify-between items-center py-2 border-b border-border">
              <p className="text-success">Discount Applied</p>
              <p className="font-medium text-success">-${bookingData?.discount}</p>
            </div>
          )}

          <div className="flex justify-between items-center py-3 bg-accent/10 px-4 rounded-lg border border-accent/20">
            <p className="font-bold text-foreground text-lg">Total Paid</p>
            <p className="font-bold text-accent text-xl">${bookingData?.totalAmount}</p>
          </div>
        </div>

        {/* Billing Information */}
        <div className="bg-muted/30 border border-border rounded-lg p-4">
          <h3 className="font-medium text-foreground mb-3">Billing Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Name</p>
              <p className="font-medium text-foreground">{paymentData?.billingName}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Email</p>
              <p className="font-medium text-foreground">{paymentData?.billingEmail}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-muted-foreground">Address</p>
              <p className="font-medium text-foreground">{paymentData?.billingAddress}</p>
            </div>
          </div>
        </div>

        {/* Receipt Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
          <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors duration-150">
            <Icon name="Download" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Download Receipt</span>
          </button>
          <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors duration-150">
            <Icon name="Mail" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Email Receipt</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSummary;