-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "phone_number" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Flight" (
    "flight_id" SERIAL NOT NULL,
    "flight_number" TEXT NOT NULL,
    "departure_time" TIMESTAMP(3) NOT NULL,
    "departure_location" TEXT NOT NULL,
    "arrival_time" TIMESTAMP(3) NOT NULL,
    "arrival_location" TEXT NOT NULL,
    "airline_id" INTEGER NOT NULL,

    CONSTRAINT "Flight_pkey" PRIMARY KEY ("flight_id")
);

-- CreateTable
CREATE TABLE "Passenger" (
    "passenger_id" SERIAL NOT NULL,
    "full_name" TEXT NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "passport_number" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,

    CONSTRAINT "Passenger_pkey" PRIMARY KEY ("passenger_id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "booking_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "flight_id" INTEGER NOT NULL,
    "booking_date" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("booking_id")
);

-- CreateTable
CREATE TABLE "Airline" (
    "airline_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "Airline_pkey" PRIMARY KEY ("airline_id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "ticket_id" SERIAL NOT NULL,
    "transport_no" TEXT NOT NULL,
    "departure_date" TIMESTAMP(3) NOT NULL,
    "origin" TEXT NOT NULL,
    "arrival_date" TIMESTAMP(3) NOT NULL,
    "destination" TEXT NOT NULL,
    "stops" INTEGER NOT NULL,
    "passenger_type" TEXT NOT NULL,
    "total_price" INTEGER NOT NULL,
    "user_id" INTEGER,
    "airline" TEXT NOT NULL,
    "booking_id" INTEGER NOT NULL,
    "seat_number" TEXT NOT NULL,
    "gate" TEXT NOT NULL,
    "boarding_time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("ticket_id")
);

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_airline_id_fkey" FOREIGN KEY ("airline_id") REFERENCES "Airline"("airline_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_flight_id_fkey" FOREIGN KEY ("flight_id") REFERENCES "Flight"("flight_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "Booking"("booking_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
