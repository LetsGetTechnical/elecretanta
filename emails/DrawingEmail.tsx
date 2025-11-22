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
  userFirstname: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const DrawingEmail = ({
  userFirstname,
}: DrawingEmailProps) => (
  <Html>
    <Head />
    <Tailwind>
      <Body className="bg-white antialiased">
        <Container className="mx-auto py-5 pb-12">
          <div className="py-[15px] bg-[#12433B]">
            <Img
              src={`${baseUrl}/static/SSE-Beta.png`}
              alt="Secret Santa Exchange"
              className="mx-auto"
            />
          </div>
          <Text className="text-[16px] leading-[26px]">
            Hi {userFirstname},
          </Text>
          <Text className="text-[16px] leading-[26px]">
            Your secret santa group has completed the drawing! Find out who you matched with and see your AI generated gift suggestions.
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
            Best,
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
  userFirstname: 'Alan',
} as DrawingEmailProps;

export default DrawingEmail;
