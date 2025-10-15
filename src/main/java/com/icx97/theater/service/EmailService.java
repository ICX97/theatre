package com.icx97.theater.service;

import com.icx97.theater.model.AppUser;
import com.icx97.theater.model.Performance;
import com.icx97.theater.model.Seat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendVerificationEmail(String to, String username, String verificationToken) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Potvrda email adrese - Jugoslovensko Dramsko Pozorište");
        
        String verificationUrl = "http://localhost:4200/verify-email?token=" + verificationToken;
        
        String emailBody = String.format(
            "Poštovani %s,\n\n" +
            "Hvala vam što ste se registovali na sajtu Jugoslovenskog Dramskog Pozorišta!\n\n" +
            "Da biste aktivirali svoj nalog, molimo vas da kliknete na sledeći link:\n" +
            "%s\n\n" +
            "Ovaj link je važeći 24 sata.\n\n" +
            "Ako niste kreirali nalog na našem sajtu, molimo vas da ignorišete ovaj email.\n\n" +
            "Srdačan pozdrav,\n" +
            "Jugoslovensko Dramsko Pozorište",
            username, verificationUrl
        );
        
        message.setText(emailBody);
        message.setFrom("theatre.test.pozoriste@gmail.com");
        
        try {
            mailSender.send(message);
            System.out.println("Verification email sent successfully to: " + to);
        } catch (Exception e) {
            System.err.println("Failed to send verification email to: " + to);
            e.printStackTrace();
        }
    }

    public void sendReservationConfirmationEmail(AppUser user, Performance performance, List<Seat> seats, double totalAmount) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getUser_email());
        message.setSubject("Potvrda rezervacije - Jugoslovensko Dramsko Pozorište");
        
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd.MM.yyyy");
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");
        
        StringBuilder seatsInfo = new StringBuilder();
        for (Seat seat : seats) {
            seatsInfo.append(String.format("- %s (Red: %d, Sediste: %s)\n", 
                seat.getSeatType().getSeatTypeName(), 
                seat.getRowNum(), 
                seat.getSeatNumber()));
        }
        
        String emailBody = String.format(
            "Poštovani %s,\n\n" +
            "Hvala vam što ste rezervisali ulaznice kod nas!\n\n" +
            "DETALJI REZERVACIJE:\n" +
            "Predstava: %s\n" +
            "Datum: %s\n" +
            "Vreme: %s\n" +
            "Sala: %s\n\n" +
            "REZERVISANA SEDIŠTA:\n%s\n" +
            "Ukupan iznos: %.0f RSD\n\n" +
            "Molimo vas da dođete 30 minuta pre početka predstave.\n" +
            "Ulaznice možete pokupiti na blagajni sa vašim imenom i prezimenom.\n\n" +
            "Ako imate bilo kakva pitanja, slobodno nas kontaktirajte.\n\n" +
            "Srdačan pozdrav,\n" +
            "Jugoslovensko Dramsko Pozorište\n" +
            "Beograd",
            user.getUsername(),
            performance.getPerformance_title(),
            performance.getPerformance_date().toLocalDateTime().toLocalDate().format(dateFormatter),
            performance.getPerformance_date().toLocalDateTime().toLocalTime().format(timeFormatter),
            performance.getHall().getHallName(),
            seatsInfo.toString(),
            totalAmount
        );
        
        message.setText(emailBody);
        message.setFrom("theatre.test.pozoriste@gmail.com");
        
        try {
            mailSender.send(message);
            System.out.println("Reservation confirmation email sent successfully to: " + user.getUser_email());
        } catch (Exception e) {
            System.err.println("Failed to send reservation confirmation email to: " + user.getUser_email());
            e.printStackTrace();
        }
    }
}
