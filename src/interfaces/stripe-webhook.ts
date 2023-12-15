export interface WebhookResponse {
    id: string
    object: string
    api_version: string
    created: number
    data: Data
    livemode: boolean
    pending_webhooks: number
    request: Request
    type: "payment_intent.created" | "payment_intent.succeeded" | "payment_intent.pending"
  }
  
  export interface Data {
    object: Object
  }
  
  export interface Object {
    id: string
    object: string
    amount: number
    amount_capturable: number
    amount_details: AmountDetails
    amount_received: number
    application: any
    application_fee_amount: any
    automatic_payment_methods: AutomaticPaymentMethods
    canceled_at: any
    cancellation_reason: any
    capture_method: string
    client_secret: string
    confirmation_method: string
    created: number
    currency: string
    customer: any
    description: string
    invoice: any
    last_payment_error: any
    latest_charge: string
    livemode: boolean
    metadata: Metadata
    next_action: any
    on_behalf_of: any
    payment_method: string
    payment_method_configuration_details: PaymentMethodConfigurationDetails
    payment_method_options: PaymentMethodOptions
    payment_method_types: string[]
    processing: any
    receipt_email: any
    review: any
    setup_future_usage: any
    shipping: Shipping
    source: any
    statement_descriptor: any
    statement_descriptor_suffix: any
    status: string
    transfer_data: any
    transfer_group: any
  }
  
  export interface AmountDetails {
    tip: Tip
  }
  
  export interface Tip {}
  
  export interface AutomaticPaymentMethods {
    allow_redirects: string
    enabled: boolean
  }
  
  export interface Metadata {
    transactionId: string,
    userId: string
  }
  
  export interface PaymentMethodConfigurationDetails {
    id: string
    parent: any
  }
  
  export interface PaymentMethodOptions {
    card: Card
  }
  
  export interface Card {
    installments: any
    mandate_options: any
    network: any
    request_three_d_secure: string
  }
  
  export interface Shipping {
    address: Address
    carrier: any
    name: string
    phone: any
    tracking_number: any
  }
  
  export interface Address {
    city: string
    country: string
    line1: string
    line2: any
    postal_code: string
    state: string
  }
  
  export interface Request {
    id: any
    idempotency_key: string
  }
  