module.exports = (creator, recipients) => {
  return `/*
 * Copyright © 2013-2016 The Nxt Core Developers.
 * Copyright © 2016 Jelurida IP B.V.
 *
 * See the LICENSE.txt file at the top-level directory of this distribution
 * for licensing information.
 *
 * Unless otherwise agreed in a custom licensing agreement with Jelurida B.V.,
 * no part of the Dbn software, including this file, may be copied, modified,
 * propagated, or distributed except according to the terms contained in the
 * LICENSE.txt file.
 *
 * Removal or modification of this copyright notice is prohibited.
 *
 */


package dbn;
import java.math.BigInteger;

public final class Genesis {

    public static final long GENESIS_BLOCK_ID = new BigInteger("0").longValue();
    public static final long CREATOR_ID = new BigInteger("${creator.accountId}").longValue();
    public static final byte[] CREATOR_PUBLIC_KEY = {
      ${creator.publicKeyBytes.toString()}
    };

    public static final long[] GENESIS_RECIPIENTS = {
        ${recipients.map((recipient) => {
            return `Long.parseUnsignedLong("${recipient.accountId}")`
        }).join(',\n        ')}
    };


    public static final int[] GENESIS_AMOUNTS = {
        ${recipients.map((recipient) => {
            return `${Number(recipient.amount)}`
        }).join(',\n        ')}
    };

    public static final byte[][] GENESIS_SIGNATURES = {
        ${recipients.map((recipient) => {
          return `{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0}`
        }).join(',\n        ')}
    };

    public static final byte[] GENESIS_BLOCK_SIGNATURE = new byte[]{
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    };

    private Genesis() {} // never

}`
}
