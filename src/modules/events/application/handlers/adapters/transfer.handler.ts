import { TransferEvent } from "@/modules/events/domain/types/transfer-event";
import { IEventHandler } from "../event.handler";
import { IAccountRepository } from "@/modules/accounts/application/repositories/account-repository";
import { HandlerResult } from "@/modules/events/domain/types/handle-result";
import { AccountNotFoundError } from "@/modules/accounts/domain/errors/account-not-found.error";
import { Account } from "@/modules/accounts/domain/entities/account.entity";

export class TransferHandler implements IEventHandler<TransferEvent> {
  constructor(private accountRepository: IAccountRepository) {}

  async handle(event: TransferEvent): Promise<HandlerResult> {
    const { origin, destination, amount } = event;

    const originAccount = await this.accountRepository.findById(origin);

    if (!originAccount) {
      throw new AccountNotFoundError(origin);
    }

    let destinationAccount = await this.accountRepository.findById(destination);

    if (!destinationAccount) {
      destinationAccount = Account.createWithInitalBalance(destination, 0);
      await this.accountRepository.save(destinationAccount);
    }

    const result = originAccount.transfer(amount, destinationAccount);

    await this.accountRepository.update(result.origin);
    await this.accountRepository.update(result.destination);

    return {
      origin: {
        id: result.origin.id,
        balance: result.origin.balance,
      },
      destination: {
        id: result.destination.id,
        balance: result.destination.balance,
      },
    };
  }
}
