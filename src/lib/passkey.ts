import { startRegistration, startAuthentication, PublicKeyCredentialCreationOptionsJSON, RegistrationResponseJSON, PublicKeyCredentialRequestOptionsJSON, AuthenticationResponseJSON } from "@simplewebauthn/browser";
import { UUID } from "crypto";

export interface PasskeyRegistrationOptions {
  token: string;
  passkeyName?: string;
}

export interface PasskeyAuthenticationOptions {
  email?: string;
}

export async function registerPasskey(options: PasskeyRegistrationOptions) {
  const { token, passkeyName } = options;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/passkey/register/start`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      }
    }
  );

  const registrationOptions: PublicKeyCredentialCreationOptionsJSON = await response.json();

  const attResp: RegistrationResponseJSON = await startRegistration({ optionsJSON: registrationOptions });

  const finishUrl = new URL(
    "/auth/passkey/register/finish",
    process.env.NEXT_PUBLIC_API_URL
  );

  if (passkeyName) {
    finishUrl.searchParams.append("name", passkeyName);
  }

  const verificationResponse = await fetch(finishUrl.toString(),{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
      body: JSON.stringify(attResp)
    }
  );

  const verificationResult = await verificationResponse.json();

  return verificationResponse.status;
}

export async function authenticateWithPasskey(options?: PasskeyAuthenticationOptions) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/passkey/loginStart`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: options?.email
      })
    }
  );

  const authenticationOptions: PublicKeyCredentialRequestOptionsJSON = await response.json();

  const authResp: AuthenticationResponseJSON = await startAuthentication({ optionsJSON: authenticationOptions });

  const verificationResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/passkey/loginFinish`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authResp)
    }
  );

  const verificationResult = await verificationResponse.json();

  return verificationResult;
}

export interface Passkey {
  ID: UUID;
  Nickname: string;
  CreatedAt: Date;
  UpdatedAt: Date;
  LastUsedAt?: Date;
}

export async function listPasskeys(token: string): Promise<Passkey[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/passkey/list`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      }
    }
  );

  const rawData = await response.json();
  const passkeys: Passkey[] = rawData.map((item: any) => ({
    ID: item.ID,
    Nickname: item.Nickname,
    CreatedAt: new Date(item.CreatedAt),
    UpdatedAt: new Date(item.UpdatedAt),
    LastUsedAt: item.LastUsedAt ? new Date(item.LastUsedAt) : undefined
  }));


  return passkeys;
}

export async function deletePasskey(token: string, passkeyId: string): Promise<boolean> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/passkey/${passkeyId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      }
    }
  );

  return response.ok;
}
