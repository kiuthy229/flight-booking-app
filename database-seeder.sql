CREATE TABLE tickets (
    ticket_id integer NOT NULL,
    transport_no text NOT NULL,
    departure_date text NOT NULL,
    origin text NOT NULL,
    arrival_date text NOT NULL,
    destination text NOT NULL,
    stops integer NOT NULL,
    passenger_type text NOT NULL,
    total_price integer NOT NULL,
    user_id integer NOT NULL,
    CONSTRAINT tickets_pkey PRIMARY KEY (ticket_id)
);

CREATE TABLE users (
    user_id integer NOT NULL,
    username text NOT NULL,
    full_name text NOT NULL,
    date_of_birth text NOT NULL,
    phone_number text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (user_id)
);

INSERT INTO
    tickets(
        ticket_id,
        transport_no,
        departure_date,
        origin,
        arrival_date,
        destination,
        stops,
        passenger_type,
        total_price,
        user_id
    )
VALUES
    (
        1,
        'ATR725',
        '2023-04-30-T07:00',
        'Hanoi',
        '2023-04-30T08:30',
        'Ho Chi Minh',
        0,
        'adult',
        3000000,
        123456
    );

INSERT INTO
    users(
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
        '01-01-2001',
        '0912345678',
        'tnmk@gmail.com',
        '$2b$10$UdVOmisNfrYpU9wqe0I61eQUQzHco4JxSwudMrjjaHV8gmM63nBqO'
    );