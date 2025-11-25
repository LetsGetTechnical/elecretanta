import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import { IGiftSuggestion } from '@/app/types/giftSuggestion';

interface DrawingEmailProps {
  userName: string;
  recipient: string;
  giftSuggestions: IGiftSuggestion[]
}

const handleAmazonLink = ({ searchTerm }: { searchTerm: string }) => {
  const encodedSearch = encodeURIComponent(searchTerm).replace(/%20/g, '+');

  return `https://www.amazon.com/s?k=${encodedSearch}&tag=${process.env.NEXT_PUBLIC_AMAZON_AFFILIATE_TAG}`;
};

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
  recipient,
  giftSuggestions
}: DrawingEmailProps) => (
  <Html>
    <Tailwind>
    <Head />
      <Body className="bg-white antialiased" style={fonts}>
        <Container className="py-5 pb-12 mx-auto">
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
            Your secret santa group drawing has completed! You matched with <strong>{recipient}</strong>.  See your AI generated gift suggestions below.
          </Text>
            {giftSuggestions?.length !== 0 && 
              giftSuggestions.map((gift) => (
                <Section style={{ marginBottom: '15px' }}>
                  <Row style={{ height: '150px' }}>
                    <Column
                      style={{
                        border: '1px solid #e2e2e2',
                        borderBottom: '0',
                        borderRight: '0',
                        borderRadius: '8px 0 0 0',
                        padding: 12,
                        verticalAlign: 'top',
                        width: '100px'
                      }}
                    >
                      <Text 
                        style={{
                          color: '#50766c',
                          backgroundColor: '#E5ECDF',
                          borderRadius: '100px',
                          display: 'inline-block',
                          padding: '0.25rem 0.75rem',
                          fontSize: '0.75rem',
                          margin: '0',
                          fontWeight: '600',
                          width: '70px',
                          textAlign: 'center'
                        }}
                      >
                        {gift.matchScore}% Match
                      </Text>
                    </Column>
                    <Column
                      style={{
                        borderTop: '1px solid #e2e2e2',
                        padding: 12,
                        textAlign: 'center',
                      }}
                    >
                      {gift.imageUrl ? (
                        <Img
                          src={gift.imageUrl}
                          alt={gift.title}
                          style={{ width: '25%', height: 'auto', borderRadius: 4, display: 'inline-block' }}
                        />
                      ) : 
                        <Img
                          src={`${baseUrl}/giftIcon_100.png`}
                          alt={gift.title}
                          style={{ width: '25%', height: 'auto', borderRadius: 4, display: 'inline-block' }}
                        />
                      }
                    </Column>
                    <Column
                      style={{
                        border: '1px solid #e2e2e2',
                        borderLeft: 0,
                        borderBottom: 0,
                        padding: 12,
                        verticalAlign: 'top',
                        width: '100px'
                      }}
                    >  
                      <Text style={{ fontSize: 14, marginTop: 8, display: 'inline-block' }}
                      >
                        ${gift.price}
                      </Text>
                    </Column>
                  </Row>
                  <Row>
                    <Column
                      style={{
                        backgroundColor: '#F8F7F0',
                        border: '1px solid #e2e2e2',
                        borderTop: '0',
                        borderRadius: '0 0 8px 8px',
                        padding: 12,
                        verticalAlign: 'top',
                      }}
                    >
                      <Text style={{ fontSize: 16, fontWeight: 700, color: '#18443C', margin: '8px 0 4px' }}>
                        {gift.title}
                      </Text>
                      <Text style={{ fontSize: 14, color: '#3b6b60', margin: 0 }}>{gift.description}</Text>
                      {Array.isArray(gift.matchReasons) && gift.matchReasons.length > 0 ? (
                        <ul 
                          style={{ 
                            backgroundColor: '#F3F1E5',
                            margin: '8px 0 0', 
                            paddingLeft: 16, 
                            fontSize: 12, 
                            color: '#18443C' 
                          }}>
                          {gift.matchReasons.map((r, i) => (
                            <li key={i}>{r}</li>
                          ))}
                        </ul>
                      ) : null}
                      
                      <Link
                        href={handleAmazonLink({ searchTerm: gift.title })}
                        style={{
                          display: 'inline-block',
                          backgroundColor: '#F1C40F',
                          color: '#000',
                          padding: '8px 12px',
                          borderRadius: 4,
                          textDecoration: 'none',
                          marginTop: 8,
                        }}
                      >
                        View Gift
                      </Link>
                    </Column>
                  </Row>
                </Section>
              ))
            }
            <Section style={{width: '50%', marginBottom: '15px'}}>
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
  recipient: 'Shashi',
  giftSuggestions: [
    {
      id: '2119',
      title: 'Callaway Junior Golf Set (Ages 9-12)',
      price: '49.99',
      description: 'This junior golf set includes a driver, an iron, and a putter designed specifically for young golfers. The lightweight clubs are perfect for developing skills while having fun on the course.',
      matchReasons: ['Video game enthusiast', 'Engaging source of knowledge and inspiration'],
      matchScore: 95,
      imageUrl: 'https://m.media-amazon.com/images/I/61mmiKSYCFL.jpg',
    },
    {
      id: '2120',
      title: "Adidas Kids' Golf Polo Shirt (Model: A2238)",
      price: '39.99',
      description: 'This stylish and comfortable golf polo is designed for kids, featuring moisture-wicking fabric and a modern fit. Perfect for looking sharp on the golf course.',
      matchReasons: ['Video game enthusiast', 'Engaging source of knowledge and inspiration'],
      matchScore: 90,
      imageUrl: null,
    },
    {
      id: '2121',
      title: 'PGA Tour Golf Ball Set (12-Pack)',
      price: '34.99',
      description: 'This set of 12 high-quality golf balls is designed for junior players, featuring a soft feel for better control and distance, ideal for practice and play.',
      matchReasons: ['Video game enthusiast', 'Engaging source of knowledge and inspiration'],
      matchScore: 88,
      imageUrl: 'https://m.media-amazon.com/images/I/81mcRPp-7zL._AC_UF350,350_QL80_.jpg'
    }
  ]
} as DrawingEmailProps;

export default DrawingEmail;
