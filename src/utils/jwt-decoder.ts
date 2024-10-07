import { jwtDecode } from 'jwt-decode';

export interface JwtPayload {
  sub: string;
  admin: boolean;
  user_id: number;
  iat: number;
  exp: number;
}

export function isAdmin(token: string): boolean {
  try {
    const decoded: JwtPayload = jwtDecode<JwtPayload>(token);
    return decoded.admin;
  } catch (error) {
    console.error('Failed to decode JWT token:', error);
    return false;
  }
}

export function getUserEMailFromToken(token: string): string {
  try {
    const decoded: JwtPayload = jwtDecode<JwtPayload>(token);
    return decoded.sub || '';
  } catch (error) {
    console.error('Failed to decode JWT token:', error);
    return '';
  }
}

export function getUserIdFromToken(token: string): number | null {
  try {
    const decoded: JwtPayload = jwtDecode<JwtPayload>(token);
    return decoded.user_id || null;
  } catch (error) {
    console.error('Failed to decode JWT token:', error);
    return null;
  }
}

export function isTokenExpired(token: string): boolean {
  try {
    const decoded: JwtPayload = jwtDecode<JwtPayload>(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch (error) {
    console.error('Failed to decode JWT token:', error);
    return true;
  }
}
