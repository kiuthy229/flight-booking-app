CREATE TABLE flights (
    flight_id SERIAL PRIMARY KEY,
    flight_number VARCHAR(50) NOT NULL,
    departure_time TIMESTAMP NOT NULL,
    departure_location VARCHAR(100) NOT NULL,
    arrival_time TIMESTAMP NOT NULL,
    arrival_location VARCHAR(100) NOT NULL,
    airline_id INTEGER NOT NULL,
    FOREIGN KEY (airline_id) REFERENCES airlines(airline_id)
);

CREATE TABLE passengers (
    passenger_id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    passport_number VARCHAR(50) NOT NULL,
    nationality VARCHAR(50) NOT NULL
);

CREATE TABLE bookings (
    booking_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    flight_id INTEGER NOT NULL,
    booking_date TIMESTAMP NOT NULL,
    status VARCHAR(50) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (flight_id) REFERENCES flights(flight_id)
);

CREATE TABLE airlines (
    airline_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    country VARCHAR(50) NOT NULL
);

CREATE TABLE seats (
    seat_id SERIAL PRIMARY KEY,
    flight_id INTEGER NOT NULL,
    seat_number VARCHAR(10) NOT NULL,
    class VARCHAR(50) NOT NULL,
    is_available BOOLEAN NOT NULL,
    FOREIGN KEY (flight_id) REFERENCES flights(flight_id)
);

CREATE TABLE payments (
    payment_id SERIAL PRIMARY KEY,
    booking_id INTEGER NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    payment_date TIMESTAMP NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    FOREIGN KEY (booking_id) REFERENCES bookings(booking_id)
);

CREATE TABLE tickets (
    ticket_id SERIAL PRIMARY KEY,
    transport_no TEXT NOT NULL,
    departure_date TIMESTAMP NOT NULL,
    origin TEXT NOT NULL,
    arrival_date TIMESTAMP NOT NULL,
    destination TEXT NOT NULL,
    stops INTEGER NOT NULL,
    passenger_type TEXT NOT NULL,
    total_price INTEGER NOT NULL,
    user_id INTEGER,
    airline TEXT,
    booking_id INTEGER NOT NULL,
    seat_number VARCHAR(10) NOT NULL,
    gate VARCHAR(10) NOT NULL,
    boarding_time TIMESTAMP NOT NULL,
    FOREIGN KEY (booking_id) REFERENCES bookings(booking_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    full_name TEXT NOT NULL,
    date_of_birth DATE NOT NULL,
    phone_number TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL
);
    (
        1,
        'ATR725',
        '2023-04-30T07:00',
        'Hanoi',
        '2023-04-30T08:30',
        'Ho Chi Minh',
        0,
        'adult',
        3000000,
        null,
        'Vietnam Airlines',
        1,
        '12A',
        'G1',
        '2023-04-30T06:30'
    );

-- Seed initial data
INSERT INTO airlines (airline_id, name, country)
VALUES
    (1, 'Vietnam Airlines', 'Vietnam'),
    (2, 'Qatar Airways', 'Qatar');

INSERT INTO flights (flight_id, flight_number, departure_time, departure_location, arrival_time, arrival_location, airline_id)
VALUES
    (1, 'VN123', '2023-04-30T07:00', 'Hanoi', '2023-04-30T09:00', 'Ho Chi Minh', 1),
    (2, 'QR456', '2023-05-01T10:00', 'Doha', '2023-05-01T18:00', 'New York', 2);

INSERT INTO passengers (passenger_id, full_name, date_of_birth, passport_number, nationality)
VALUES
    (1, 'John Doe', '1990-01-01', 'A12345678', 'USA'),
    (2, 'Jane Smith', '1985-05-15', 'B98765432', 'UK');

INSERT INTO bookings (booking_id, user_id, flight_id, booking_date, status)
VALUES
    (1, 123456, 1, '2023-04-01T10:00', 'confirmed'),
    (2, 123456, 2, '2023-04-02T11:00', 'confirmed');

INSERT INTO tickets (
    ticket_id,
    transport_no,
    departure_date,
    origin,
    arrival_date,
    destination,
    stops,
    passenger_type,
    total_price,
    user_id,
    airline,
    booking_id,
    seat_number,
    gate,
    boarding_time
)
VALUES
    (
        1,
        'ATR725',
        '2023-04-30T07:00',
        'Hanoi',
        '2023-04-30T08:30',
        'Ho Chi Minh',
        0,
        'adult',
        3000000,
        null,
        'Vietnam Airlines',
        1,
        '12A',
        'G1',
        '2023-04-30T06:30'
    );

INSERT INTO users (
    user_id,
    username,
    full_name,
    date_of_birth,
    phone_number,
    email,
    password
)
VALUES
    (
        123456,
        'tnmk',
        'Thy Nguyen',
        '2001-01-01',
        '0912345678',
        'tnmk@gmail.com',
        '$2b$10$UdVOmisNfrYpU9wqe0I61eQUQzHco4JxSwudMrjjaHV8gmM63nBqO'
    );