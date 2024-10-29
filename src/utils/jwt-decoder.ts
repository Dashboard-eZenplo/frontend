import { jwtDecode } from 'jwt-decode';

export interface JwtPayload {
  sub: string;
  admin: boolean;
  user_id: number;
  iat: number;
  exp: number;
}

export function isAdmin(token: string): boolean {
  const decoded = decodeToken(token);
  return decoded?.admin ?? false;
}

export function getUserEMailFromToken(token: string): string {
  const decoded = decodeToken(token);
  return decoded?.sub ?? '';
}

export function getUserIdFromToken(token: string): number | null {
  const decoded = decodeToken(token);
  return decoded?.user_id ?? null;
}

export function isTokenExpired(token: string): boolean {
  const decoded = decodeToken(token);
  if (!decoded) {
    return true; // Se não conseguir decodificar, considera o token expirado
  }

  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.exp < currentTime;
}

function decodeToken(token: string): JwtPayload | null {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch (error) {
    console.error('Failed to decode JWT token:', error);
    return null;
  }
}
