import styled from '@emotion/styled';
import { Theme } from '../../themes';

const TermsWrapper = styled.div<{ theme: Theme }>`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: ${({ theme }) => theme.cardBg};
  border-radius: 12px;
  color: ${({ theme }) => theme.text};
  font-family: 'Inter', sans-serif;
  line-height: 1.6;
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const Heading = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const SubHeading = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

interface TermsAndConditionsProps {
  theme: Theme;
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ theme }) => {
  return (
    <TermsWrapper theme={theme}>
      <Heading>Terms and Conditions</Heading>
      <Section>
        <SubHeading>1. Acceptance of Terms</SubHeading>
        <p>
          By accessing or using CelebrityCrush ("the Platform"), you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree to these Terms, you may not use the Platform.
        </p>
      </Section>
      <Section>
        <SubHeading>2. Age Restrictions</SubHeading>
        <p>
          You must be at least 13 years of age to use the Platform. By using the Platform, you represent and warrant that you are at least 13 years old. Certain features, including access to NSFW (Not Safe For Work) content, are restricted to users who are at least 18 years of age. You must verify your age to access such content, and you represent and warrant that you are at least 18 years old if accessing NSFW content.
        </p>
      </Section>
      <Section>
        <SubHeading>3. User-Generated Content</SubHeading>
        <p>
          Users may create, upload, and sell content on the Platform, including fan-made merchandise, art, NFTs, and other items ("User Content"). You are solely responsible for ensuring that your User Content does not infringe on the intellectual property rights, rights of publicity, or other rights of any third party, including celebrities. CelebrityCrush is not responsible for any User Content and reserves the right to remove any content that violates these Terms or applicable laws.
        </p>
      </Section>
      <Section>
        <SubHeading>4. Marketplace and Monetization</SubHeading>
        <p>
          The Platform allows users to buy, sell, and trade items such as fan-made merchandise, art, NFTs, and crypto-based assets. You represent and warrant that you have the legal right to sell any items you list on the Platform. CelebrityCrush is not responsible for any disputes arising from marketplace transactions. All sales are final unless otherwise stated.
        </p>
      </Section>
      <Section>
        <SubHeading>5. Intellectual Property</SubHeading>
        <p>
          You retain ownership of your User Content, but by uploading it to the Platform, you grant CelebrityCrush a non-exclusive, worldwide, royalty-free license to use, display, and distribute your content for the purpose of operating the Platform. You must not upload content that infringes on the intellectual property rights of others, including celebrities’ names, images, or likenesses, without proper authorization.
        </p>
      </Section>
      <Section>
        <SubHeading>6. Limitation of Liability</SubHeading>
        <p>
          CelebrityCrush is not liable for any damages arising from your use of the Platform, including but not limited to legal disputes related to User Content, marketplace transactions, or interactions with other users. You agree to indemnify and hold harmless CelebrityCrush, its affiliates, and its employees from any claims, damages, or legal fees arising from your use of the Platform or violation of these Terms.
        </p>
      </Section>
      <Section>
        <SubHeading>7. Termination</SubHeading>
        <p>
          CelebrityCrush reserves the right to suspend or terminate your account at any time for violation of these Terms, including but not limited to uploading infringing content, engaging in fraudulent activity, or violating age restrictions.
        </p>
      </Section>
      <Section>
        <SubHeading>8. Governing Law</SubHeading>
        <p>
          These Terms are governed by the laws of [Your State/Country]. Any disputes arising from these Terms will be resolved in the courts of [Your State/Country].
        </p>
      </Section>
      <Section>
        <SubHeading>9. Changes to Terms</SubHeading>
        <p>
          CelebrityCrush may update these Terms at any time. We will notify users of significant changes via email or a notice on the Platform. Your continued use of the Platform after such changes constitutes acceptance of the updated Terms.
        </p>
      </Section>
      <Section>
        <SubHeading>10. Contact Us</SubHeading>
        <p>
          If you have any questions about these Terms, please contact us at support@celebritycrush.com.
        </p>
      </Section>
    </TermsWrapper>
  );
};

export default TermsAndConditions;
