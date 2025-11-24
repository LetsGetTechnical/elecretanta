import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

interface DrawingEmailProps {
  userName: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000/static';

// System Font Stack for macOS, iOS, Windows, Android, Linux
// Matches system-ui font stack in Next.js
const fonts = {
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
}

export const DrawingEmail = ({
  userName,
}: DrawingEmailProps) => (
  <Html>
    <Tailwind>
    <Head />
      <Body className="bg-white antialiased" style={fonts}>
        <Container className="mx-auto py-5 pb-12">
          <div className="py-[15px] bg-[#12433B] rounded-[12px]" style={{ maxWidth: '100%'}}>
            <Img
              src={`${baseUrl}/secret_santa_exchange_logo_beta.png`}
              alt="Secret Santa Exchange"
              className="mx-auto w-80"
            />
          </div>
          <Text className="text-[16px] leading-[26px]">
            Hi {userName},
          </Text>
          <Text className="text-[16px] leading-[26px]">
            Your secret santa group drawing has completed! Find out who you matched with and see your AI generated gift suggestions.
          </Text>
          <Section className="text-center">
            <Button
              className="bg-[#0D352E] rounded-[3px] text-white text-[16px] no-underline text-center block p-3"
              href="https://secretsanta-exchange.com"
            >
              View Results
            </Button>
          </Section>
          <Text className="text-[16px] leading-[26px]">
            Happy Holidays,
            <br />
            The Secret Santa Exchange Team
          </Text>
          <Hr className="border-[#cccccc] my-5" />
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

DrawingEmail.PreviewProps = {
  userName: 'Jeremy',
} as DrawingEmailProps;

export default DrawingEmail;
