import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  signup() {
    return {
      msg: 'Sign UP!!!',
    };
  }

  signin() {
    return {
      msg: 'Sign IN!!!',
    };
  }
}
